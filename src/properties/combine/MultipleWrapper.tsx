// import Sortable, { ISortableItem, SortableItemContentProps } from '../../sortable';
import React, { memo, useRef, useState } from 'react';

import Sortable from '@asany/sortable';
import { Icon } from '@asany/icons';

import { generateUUID } from '../../utils';

import WrapperItem from './WrapperItem';

export interface IMultipleWrapperData<T> {
  /** 标识 唯一值 (后续删除 20.7.21) */
  id: string;
  /** 显示的图标 */
  icon?: string;
  /** 展示名称 */
  name?: string;
  /** 可以编辑名称 */
  canEditName?: boolean;
  /** 当前项可以排序 */
  sortable?: boolean;
  /** 是否为预设项 */
  isPreset?: boolean;
  editing?: boolean;
  /**
   * 当前项目 是否是可使用状态(系统预设值)，
   * 如果为用户添加项，该值一定为 false
   */
  isDelete?: boolean;

  data?: T;
  [key: string]: any;
}
export interface MultipleWrapperProps {
  /** 配置标题 */
  name?: string;
  /** 孩子组件 */
  children: React.ReactElement;
  /** 可以添加项目,显示按钮且可以使用 */
  canAddItem: boolean;
  /** 在可以添加项目的同时给予内部数据的初始化 */
  getAddData: () => IMultipleWrapperData<any>;
  /** 可以对项目排序 */
  canSortItem: boolean;
  /** 选项显示名 */
  itemName: string;
  itemClassName?: string;
  itemRender?: ItemRender;
  /** 预设项目 */
  presetValue: IMultipleWrapperData<any>[];
  /** 当创建完成立即展示 popover */
  immediatelyShowPopoverWhenCreated: boolean;

  value: any[];
  initializer?: (data: IMultipleWrapperData<any>) => IMultipleWrapperData<any>;
  onChange: (value: IMultipleWrapperData<any>[]) => void;
  pipeline?: (value: IMultipleWrapperData<any>[], current: IMultipleWrapperData<any>) => IMultipleWrapperData<any>[];
}

interface ItemRenderProps {
  drag: any;
  data: any;
  onDelete: any;
  onChange: any;
  showPopoverImmediatelyAtCreated: boolean;
}

type ItemRender = (props: ItemRenderProps) => React.ReactElement;

type BuildItemRenderOptions = {
  buildDelete: (data: IMultipleWrapperData<any>) => () => void;
  buildChange: (data: IMultipleWrapperData<any>) => (newData: any) => void;
  className?: string;
  showPopoverImmediatelyAtCreated: boolean;
  children: any;
};

const buildItemRender = (XItemRender: ItemRender | undefined, options: BuildItemRenderOptions) => {
  const { children, className, buildChange, buildDelete, showPopoverImmediatelyAtCreated } = options;
  const InnerItemRender = React.forwardRef((props: any, ref: any) => {
    if (!children && !XItemRender) {
      return <WrapperItem {...props} ref={ref} />;
    }
    return XItemRender ? <XItemRender {...props} ref={ref} /> : React.cloneElement(children, { ...props, ref });
  });
  return ({ data, drag, ...props }: any /*SortableItemContentProps*/, ref: any) => {
    console.log('popoverContentVisible', showPopoverImmediatelyAtCreated);
    const itemRenderProps: ItemRenderProps = {
      drag,
      data,
      onDelete: buildDelete(data as any),
      onChange: buildChange(data as any),
      showPopoverImmediatelyAtCreated,
    };

    return (
      <li {...props} className={className} ref={ref}>
        <InnerItemRender {...itemRenderProps} />
      </li>
    );
  };
};
function getAddItem(
  type: string,
  defaultName: string = '',
  canSortItem: boolean,
  getAddData = () => ({})
): IMultipleWrapperData<any> {
  return {
    id: generateUUID(),
    icon: '',
    type,
    // 展示名称
    name: defaultName || '',
    // 是否支持可以排序
    sortable: canSortItem,
    // 是否为预设项
    isPreset: false,
    // 是否可以被删除，如果为用户添加项，该值一定为 false
    isDelete: false,
    data: getAddData(),
    canEditName: true,
    component: 'notFound',
  };
}

export function MultipleWrapper<T>(props: MultipleWrapperProps) {
  const {
    onChange,
    children,
    canAddItem,
    canSortItem = true,
    immediatelyShowPopoverWhenCreated: immediatelyShow = true,
    itemName,
    pipeline,
    itemClassName,
    itemRender: defaultItemRender,
    presetValue,
    initializer,
    getAddData,
  } = props;

  // 当创建完成立即展示 popover 在第一次点击新增后变为 true,然后新增F的行会展示
  // 初始为 false 意义是无法辨别当前行是否新增
  const sortableType = useRef(generateUUID());

  const [value, setOldValue] = useState<IMultipleWrapperData<T>[]>(
    (props.value || presetValue || []).map((item) => ({
      id: item.id || generateUUID(),
      data: item,
      sortable: canSortItem,
      type: sortableType.current,
      state: 'isOld',
    }))
  );

  const setValue = (value: IMultipleWrapperData<any>[]) => {
    setOldValue(value);
    // console.log('Items Change', value);
    onChange && onChange(value.map((item) => item.data));
  };

  const temp = useRef<any>({});
  temp.current.value = value;

  const handleDelete = (data: IMultipleWrapperData<any>) => () => {
    const { value } = temp.current;
    const index: number = value.findIndex((item: any) => item.id === data.id);
    const newVal = [...value];
    if (!data.isPreset) {
      // 上一次绑定
      newVal.splice(index, 1);
    } else {
      const isDelete = !data.isDelete;
      newVal.splice(index, 1, Object.assign(data, { isDelete }));
    }
    setValue(newVal);
  };

  const handleItemChange = (data: any) => (newData: any) => {
    const { value } = temp.current;
    // console.log('Items Change', data, newData);
    const newValue = value.map((item: any) => (item.id === data.id ? { ...data, ...newData } : item));
    setValue(pipeline ? pipeline(newValue, newData) : newValue);
  };

  const handleInsertRow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canAddItem) {
      return;
    }
    const item = getAddItem(sortableType.current, itemName, canSortItem, getAddData);
    setValue([...value, { ...(initializer ? initializer(item) : item), state: 'isNew' }]);
  };

  const handleSortChange = (items: any[]) => {
    // console.log('handleSortChange', items);
    setValue(items);
  };

  // TODO buildItemRender

  const itemRender = buildItemRender(defaultItemRender, {
    buildDelete: handleDelete,
    buildChange: handleItemChange,
    className: itemClassName,
    showPopoverImmediatelyAtCreated: immediatelyShow,
    children,
  });

  console.log('xxxx', value);

  return (
    <div className="multiple-wrapper">
      <div className="multiple-wrapper-header">
        {canAddItem && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={handleInsertRow}>
            <Icon name="AsanyEditor/Plus" />
          </a>
        )}
      </div>
      {canSortItem ? (
        <Sortable
          accept={[sortableType.current]}
          className="multiple-wrapper-list"
          empty={<div>没有数据</div>}
          tag="ul"
          items={value}
          itemRender={itemRender}
          onChange={handleSortChange}
        />
      ) : (
        <ul className="multiple-wrapper-list">
          {value.map((item: any) => (
            <li key={`multiple-item-${item.id}`} className={itemClassName}>
              {React.cloneElement(children, {
                id: item.id,
                data: item,
                popoverContentVisible: immediatelyShow,
                onDelete: handleDelete(item),
                onChange: handleItemChange(item),
              })}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

MultipleWrapper.defaultProps = {
  canSortItem: true,
  immediatelyShowPopoverWhenCreated: true,
  canAddItem: true,
};

export default memo(MultipleWrapper);
