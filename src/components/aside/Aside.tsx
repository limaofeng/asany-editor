import { isEqual } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from '../../hooks';
import { UIActionType } from '../../reducers/actions';
import { visibleFilter } from '../../utils';
import { DynaActionFormContext } from '../../utils/BlockAside';
import ConfigurationToolbar from './ConfigurationToolbar';
import PropertiesPanel, { IPropertiesPanel } from './PropertiesPanel';

interface AsideProps {}

// const tags: string[] = []; // LibraryManager.getComponentsByTag('模版/');

// TODO 组件配置信息
// const definitions: IComponentProperty[] = [
//   {
//     name: 'description',
//     label: '描述',
//     type: ComponentPropertyType.Text,
//     defaultValue: '',
//   },
//   {
//     name: 'cover',
//     label: '简图',
//     type: ComponentPropertyType.Text,
//     defaultValue: '',
//   },
//   {
//     name: 'tags',
//     label: '标签',
//     type: ComponentPropertyType.Text,
//     multiple: true,
//     defaultValue: [],
//     renderer: {
//       component: 'SelectTag',
//       props: { style: { width: '100%' } },
//     },
//   },
//   {
//     name: 'type',
//     label: '类型',
//     type: ComponentPropertyType.Enum,
//     enumeration: {
//       id: 'componentType',
//       name: '组件类型',
//       values: [
//         {
//           id: 'Config',
//           name: '配置式',
//           value: 'Config',
//         },
//         {
//           id: 'SourceCode',
//           name: '源码式',
//           value: 'SourceCode',
//         },
//       ],
//     },
//     defaultValue: 'Config',
//   },
//   {
//     name: 'template',
//     label: '母版',
//     type: ComponentPropertyType.Text,
//     defaultValue: '',
//     renderer: (props: any) => {
//       const { onChange } = props;

//       let value: string[] = [];
//       if (props.value) {
//         const info: any = {}; // LibraryManager.getComponent(props.value);
//         const tag = info.tags.find((item: string) => item.startsWith('模版/'));
//         if (tag) {
//           const [, ...tags] = tag.split('/');
//           tags.push(info.id);
//           value = tags;
//         }
//       }

//       const handleChange = (values: any) => {
//         onChange(values[values.length - 1]);
//       };

//       console.log('handleChange', handleChange, tags, value, handleChange);

//       return (
//         <>
//           {/*         <Cascader
//           options={tags}
//           value={value}
//           onChange={handleChange}
//           style={{ width: '100%' }}
//           expandTrigger="hover"
//         /> */}
//         </>
//       );
//     },
//   },
// ];

// console.warn('需要删除', definitions);

/**
 * 定制面板
 * @param props
 */
function Aside(_: AsideProps) {
  const visible = useSelector((state) => state.ui.aside.visible);

  const dispatch = useDispatch();
  // const currentValue = useRef();

  const [top, setTop] = useState(60);
  // const current = useSelector((state) => state.current);
  const externalTabs = useSelector((state) => state.ui.aside.tabs);
  const width = useSelector((state) => state.ui.aside.options?.width || 240);
  const initialValue = useSelector((state) => state.ui.aside.options?.value);
  const handleChange = useSelector((state) => state.ui.aside.options?.update);
  const watchValue = useSelector((state) => state.ui.aside.options?.watchValue, isEqual);
  const scenaToolbarVisible = useSelector((state) => state.ui.scena.toolbar.visible);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!watchValue) {
      return;
    }
    return watchValue(setValue);
  }, [watchValue]);

  console.log('value', value);

  // const handleChange = useDebounce(
  //   (value: any) => {
  //     current && current.onChange(assign({}, currentValue.current, value));
  //   },
  //   150,
  //   [current]
  // );

  // const isRoot = !current || current.key === father;

  const handleClose = useCallback(() => dispatch({ type: UIActionType.CloseAside }), []);

  const configuration = useRef<IPropertiesPanel>(null);

  useEffect(() => {
    dispatch({
      type: UIActionType.AsideRef,
      payload: configuration,
    });
  }, []);

  const tabs = useMemo(() => {
    return externalTabs.map((item) => ({
      ...item,
      content: <item.content onChange={handleChange} />,
    }));
  }, [externalTabs]);

  useEffect(() => {
    const { container } = configuration.current!;
    const navHeight = parseInt(getComputedStyle(container).getPropertyValue('--editor-navigation-height'));
    const top = navHeight + (scenaToolbarVisible ? 40 : 0);
    setTop(top);
  }, [scenaToolbarVisible]);

  return (
    <DynaActionFormContext.Provider value={value}>
      <PropertiesPanel
        className="sketch-configuration"
        ref={configuration}
        style={{
          top: top,
          width,
          ...(visible ? {} : { transform: `translate3d(${width}px, 0, 0)` }),
        }}
        tabs={tabs.filter(visibleFilter(value))}
        footer={<ConfigurationToolbar />}
        onClose={handleClose}
      />
    </DynaActionFormContext.Provider>
  );
}

export default React.memo(Aside);
