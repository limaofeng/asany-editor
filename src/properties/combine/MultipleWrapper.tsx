// import Sortable, { ISortableItem, SortableItemContentProps } from '../../sortable';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';

import Sortable, { SortableItemProps } from '@asany/sortable';
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
  placeholder?: string;
  /** 孩子组件 */
  children: React.ReactElement;
  /** 可以添加项目,显示按钮且可以使用 */
  canAddItem: boolean;
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
  isObject?: boolean;
  initializer?: (data: IMultipleWrapperData<any>) => any;
  onChange: (value: IMultipleWrapperData<any>[]) => void;
  pipeline?: (value: IMultipleWrapperData<any>[], current: IMultipleWrapperData<any>) => IMultipleWrapperData<any>[];
}

type ItemRender = (props: any) => React.ReactElement;

type BuildItemRenderOptions = {
  buildChange: (data: IMultipleWrapperData<any>) => (newData: any) => void;
  className?: string;
  placeholder?: string;
  isObject: boolean;
  showPopoverImmediatelyAtCreated: boolean;
  children: any;
};

const buildItemRender = (XItemRender: ItemRender | undefined, options: BuildItemRenderOptions) => {
  const { children, placeholder, className, isObject, buildChange, showPopoverImmediatelyAtCreated } = options;
  const InnerItemRender = React.forwardRef((props: any, ref: any) => {
    if (!children && !XItemRender) {
      return (
        <WrapperItem
          {...props}
          placeholder={placeholder}
          editable={!isObject ? false : undefined}
          nameLink={!isObject ? false : undefined}
          ref={ref}
        />
      );
    }
    return XItemRender ? <XItemRender {...props} ref={ref} /> : React.cloneElement(children, { ...props, ref });
  });
  return (
    { data, drag, remove, update, dragging, indicator, animated, level, index, ...props }: SortableItemProps<any>,
    ref: any
  ) => {
    const itemRenderProps = {
      level,
      index,
      drag,
      data,
      onDelete: remove,
      onChange: buildChange(data as any),
      showPopoverImmediatelyAtCreated,
    };

    return (
      <li {...animated} {...props} className={className} ref={ref}>
        <InnerItemRender {...itemRenderProps} />
      </li>
    );
  };
};
function getAddItem(
  type: string,
  defaultName: string = '',
  canSortItem: boolean,
  isObject: boolean
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
    data: isObject ? {} : '',
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
    placeholder,
    pipeline,
    itemClassName,
    itemRender: defaultItemRender,
    presetValue,
    isObject = true,
    initializer,
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

  const setValue = useCallback((value: IMultipleWrapperData<any>[]) => {
    setOldValue(value);
    // console.log('Items Change', value);
    onChange && onChange(value.map((item) => item.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const item = getAddItem(sortableType.current, itemName, canSortItem, isObject);
    setValue([...value, { ...item, data: initializer ? initializer(item) : item.data, state: 'isNew' }]);
  };

  const handleSortChange = useCallback(
    (items: any[]) => {
      setValue(items);
    },
    [setValue]
  );

  const itemRender = useMemo(
    () =>
      buildItemRender(defaultItemRender, {
        buildChange: handleItemChange,
        className: itemClassName,
        isObject,
        placeholder,
        showPopoverImmediatelyAtCreated: immediatelyShow,
        children,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log('........', value);

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
          tag="ul"
          items={value}
          itemRender={itemRender}
          // preview={{
          //   render: dragPreview(itemRender),
          //   axisLocked: true,
          // }}
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
