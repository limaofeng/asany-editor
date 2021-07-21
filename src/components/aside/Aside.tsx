// import { Cascader } from 'antd';
import { assign, isEqual } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// import { visibleFilter } from '../../../library-manager/ConfigurationPanel';
// import LibraryManager from '../../../library-manager/LibraryManager';
// import { ComponentPropertyType, IComponentProperty } from '../../../library-manager/typings';
import { useDebounce, visibleFilter } from '../../utils';
import { useDispatch, useSelector } from '../../hooks';
import { UIActionType } from '../../reducers/actions';
import {
  ComponentPropertyType,
  father,
  IComponentProperty,
} from '../../typings';
import Settings, { ISettings, TabPane } from './PropertiesPanel';
import * as DataEntrys from './components/data-entry';
import ConfigurationToolbar from './ConfigurationToolbar';

console.warn('📦 打包时, connect 逻辑会失效 TODO 临时解决方案', DataEntrys);

interface AsideProps {}

const tags: string[] = []; // LibraryManager.getComponentsByTag('模版/');

// TODO 组件配置信息
const definitions: IComponentProperty[] = [
  {
    name: 'description',
    label: '描述',
    type: ComponentPropertyType.Text,
    defaultValue: '',
  },
  {
    name: 'cover',
    label: '简图',
    type: ComponentPropertyType.Text,
    defaultValue: '',
  },
  {
    name: 'tags',
    label: '标签',
    type: ComponentPropertyType.Text,
    multiple: true,
    defaultValue: [],
    renderer: {
      component: 'SelectTag',
      props: { style: { width: '100%' } },
    },
  },
  {
    name: 'type',
    label: '类型',
    type: ComponentPropertyType.Enum,
    enumeration: {
      id: 'componentType',
      name: '组件类型',
      values: [
        {
          id: 'Config',
          name: '配置式',
          value: 'Config',
        },
        {
          id: 'SourceCode',
          name: '源码式',
          value: 'SourceCode',
        },
      ],
    },
    defaultValue: 'Config',
  },
  {
    name: 'template',
    label: '母版',
    type: ComponentPropertyType.Text,
    defaultValue: '',
    renderer: (props: any) => {
      const { onChange } = props;

      let value: string[] = [];
      if (props.value) {
        const info: any = {}; // LibraryManager.getComponent(props.value);
        const tag = info.tags.find((item: string) => item.startsWith('模版/'));
        if (tag) {
          const [, ...tags] = tag.split('/');
          tags.push(info.id);
          value = tags;
        }
      }

      const handleChange = (values: any) => {
        onChange(values[values.length - 1]);
      };

      // TODO: 默认
      console.log('handleChange', handleChange, tags, value, handleChange);

      return (
        <>
          {/*         <Cascader
          options={tags}
          value={value}
          onChange={handleChange}
          style={{ width: '100%' }}
          expandTrigger="hover"
        /> */}
        </>
      );
    },
  },
];

console.warn('需要删除', definitions);

/**
 * 定制面板
 * @param props
 */
function Aside(_: AsideProps) {
  const visible = useSelector((state) => state.ui.aside.visible);

  const dispatch = useDispatch();
  const currentValue = useRef();
  const current = useSelector((state) => state.current);
  const externalTabs = useSelector((state) => state.ui.aside.tabs);
  const options = useSelector((state) => state.ui.aside.options || {}, isEqual);
  const scenaToolbarVisible = useSelector(
    (state) => state.ui.scena.toolbar.visible
  );
  const value = useSelector((state) => state.current?.value || {}, isEqual);
  const [tabs, setTabs] = useState<TabPane[]>([]);

  currentValue.current = value;

  const handleChange = useDebounce(
    (value: any) => {
      current && current.onChange(assign({}, currentValue.current, value));
    },
    150,
    [current]
  );

  const isRoot = !current || current.key === father;

  const handleClose = useCallback(
    () => dispatch({ type: UIActionType.CloseAside }),
    []
  );

  const configuration = useRef<ISettings>(null);

  useEffect(() => {
    dispatch({
      type: UIActionType.AsideRef,
      payload: configuration,
    });
  }, []);

  useEffect(() => {
    setTabs(
      externalTabs.map((item) => ({
        ...item,
        content: <item.content onChange={handleChange} />,
      }))
    );
  }, [externalTabs]);

  if (!isRoot && !current) {
    return <></>;
  }

  const top =
    typeof options.top === 'number'
      ? options.top
      : 50 + (scenaToolbarVisible ? 40 : 0);

  return (
    <Settings
      className="sketch-configuration"
      ref={configuration}
      style={{
        top: top,
        width: options?.width || 240,
        ...(visible
          ? {}
          : { transform: `translate3d(${options?.width || 240}px, 0, 0)` }),
      }}
      tabs={tabs.filter(visibleFilter(value))}
      footer={<ConfigurationToolbar />}
      onClose={handleClose}
    />
  );
}

export default React.memo(Aside);
