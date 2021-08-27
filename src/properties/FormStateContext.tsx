import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react';

import { EventEmitter } from 'events';

import { Form } from 'antd';
import { FormInstance, FormProps, useForm } from 'antd/lib/form/Form';

type SubscribeCallback = () => void;
export type Selector<Selected> = (state: any) => Selected;
export type EqualityFn<Selected> = (a: Selected, b: Selected) => boolean;

const defaultEqualityFn = (a: any, b: any) => a === b;

interface FormProviderProps extends FormProps {}

const EVENT_FIELDSCHANGE = 'FieldsChange';

class FormEventManager {
  private emitter = new EventEmitter();
  private form?: FormInstance;

  constructor(form?: FormInstance) {
    this.form = form;
  }

  dispatch(action: any) {
    this.emitter.emit(EVENT_FIELDSCHANGE, action);
  }

  unsubscribe = (callback: SubscribeCallback) => () => {
    this.emitter.removeListener(EVENT_FIELDSCHANGE, callback);
  };

  subscribe = (callback: SubscribeCallback) => {
    this.emitter.addListener(EVENT_FIELDSCHANGE, callback);
    return this.unsubscribe(callback);
  };

  getState = () => this.form!.getFieldsValue();
}

const FormStateContext = React.createContext<FormEventManager>(new FormEventManager());

function FormProvider(props: FormProviderProps) {
  const { form, onValuesChange } = props;
  const manager = useRef(new FormEventManager(form));

  const handleValuesChange = useCallback(
    (changedValues, allValues) => {
      manager.current.dispatch(changedValues);
      onValuesChange && onValuesChange(changedValues, allValues);
    },
    [onValuesChange]
  );

  useEffect(() => {
    if (!form) {
      return;
    }
    form.setFieldsValue = ((OldSetFieldsValue) => (value: any) => {
      OldSetFieldsValue(value);
      setTimeout(() => manager.current.dispatch(value), 250);
    })(form.setFieldsValue);
  }, [form]);

  return (
    <FormStateContext.Provider value={manager.current}>
      <Form {...props} onValuesChange={handleValuesChange} />
    </FormStateContext.Provider>
  );
}

FormProvider.Item = Form.Item;

export const useFormState = (): [FormInstance, typeof Form] => {
  const [form] = useForm();
  return [form, FormProvider as typeof Form];
};

export function useFormSelector<Selected>(
  selector: Selector<Selected>,
  equalityFn: EqualityFn<Selected> = defaultEqualityFn
) {
  const context = useContext(FormStateContext);
  const state = context.getState();
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const latestSelectedState = useRef<Selected>();
  const selectedState = selector(state);
  const checkForUpdates = useCallback(function checkForUpdates() {
    const newSelectedState = selector(state);
    if (equalityFn(newSelectedState, latestSelectedState.current!)) {
      return;
    }
    latestSelectedState.current = newSelectedState;
    forceRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return context.subscribe(checkForUpdates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return selectedState;
}
