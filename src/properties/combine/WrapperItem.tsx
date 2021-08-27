import React, { MutableRefObject, memo } from 'react';

import Icon from '@asany/icons';
import { Checkbox, Input } from 'antd';

import { IMultipleWrapperData } from './MultipleWrapper';

// import { SortableItemContentProps } from '../../sortable';

export const SortableHandler = () => {
  return (
    <span role="img" aria-label="sortable-handler-icon" className="anticon sortable-handler-icon">
      <svg
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        width="16"
        height="16"
        viewBox="0 0 5 16"
        className="ve-svgicon"
        style={{ verticalAlign: 'middle' }}
      >
        <path
          d="M0.499972716,6 L1.50002728,6 C1.77615459,6 2,6.22384541 2,6.49997272 C2,6.77610002 1.77615459,6.99994543 1.50002728,6.99994543 L0.499972716,6.99994543 C0.22384541,6.99994543 3.38158422e-17,6.77610002 0,6.49997272 C-3.38158422e-17,6.22384541 0.22384541,6 0.499972716,6 Z M0.499972716,3 L1.50002728,3 C1.77615459,3 2,3.22384541 2,3.49997272 C2,3.77610002 1.77615459,3.99994543 1.50002728,3.99994543 L0.499972716,3.99994543 C0.22384541,3.99994543 3.38158422e-17,3.77610002 0,3.49997272 C-3.38158422e-17,3.22384541 0.22384541,3 0.499972716,3 Z M0.499972716,7.28787148e-18 L1.50002728,5.55666624e-14 C1.77615459,7.07214574e-14 2,0.22384541 2,0.499972716 C2,0.776100022 1.77615459,0.999945432 1.50002728,0.999945432 L0.499972716,0.999945432 C0.22384541,0.999945432 3.38158422e-17,0.776100022 0,0.499972716 C-3.38158422e-17,0.22384541 0.22384541,5.0723721e-17 0.499972716,0 Z M0.5,9.00002729 L1.5,9.00002729 C1.77614237,9.00002729 2,9.22388491 2,9.50002729 C2,9.77616966 1.77614237,10.0000273 1.5,10.0000273 L0.5,10.0000273 C0.223857625,10.0000273 3.38176876e-17,9.77616966 0,9.50002729 C-3.38176876e-17,9.22388491 0.223857625,9.00002729 0.5,9.00002729 Z M0.5,12.0000273 L1.5,12.0000273 C1.77614237,12.0000273 2,12.2238849 2,12.5000273 C2,12.7761697 1.77614237,13.0000273 1.5,13.0000273 L0.5,13.0000273 C0.223857625,13.0000273 3.38176876e-17,12.7761697 0,12.5000273 C-3.38176876e-17,12.2238849 0.223857625,12.0000273 0.5,12.0000273 Z M0.5,15.0000273 L1.5,15.0000273 C1.77614237,15.0000273 2,15.2238849 2,15.5000273 C2,15.7761697 1.77614237,16.0000273 1.5,16.0000273 L0.5,16.0000273 C0.223857625,16.0000273 3.38176876e-17,15.7761697 0,15.5000273 C-3.38176876e-17,15.2238849 0.223857625,15.0000273 0.5,15.0000273 Z M3.49997272,6 L4.50002728,6 C4.77615459,6 5,6.22384541 5,6.49997272 C5,6.77610002 4.77615459,6.99994543 4.50002728,6.99994543 L3.49997272,6.99994543 C3.22384541,6.99994543 3,6.77610002 3,6.49997272 C3,6.22384541 3.22384541,6 3.49997272,6 Z M3.49997272,3 L4.50002728,3 C4.77615459,3 5,3.22384541 5,3.49997272 C5,3.77610002 4.77615459,3.99994543 4.50002728,3.99994543 L3.49997272,3.99994543 C3.22384541,3.99994543 3,3.77610002 3,3.49997272 C3,3.22384541 3.22384541,3 3.49997272,3 Z M3.49997272,7.28787148e-18 L4.50002728,5.55666624e-14 C4.77615459,7.07214574e-14 5,0.22384541 5,0.499972716 C5,0.776100022 4.77615459,0.999945432 4.50002728,0.999945432 L3.49997272,0.999945432 C3.22384541,0.999945432 3,0.776100022 3,0.499972716 C3,0.22384541 3.22384541,5.0723721e-17 3.49997272,0 Z M3.5,9.00002729 L4.5,9.00002729 C4.77614237,9.00002729 5,9.22388491 5,9.50002729 C5,9.77616966 4.77614237,10.0000273 4.5,10.0000273 L3.5,10.0000273 C3.22385763,10.0000273 3,9.77616966 3,9.50002729 C3,9.22388491 3.22385763,9.00002729 3.5,9.00002729 Z M3.5,12.0000273 L4.5,12.0000273 C4.77614237,12.0000273 5,12.2238849 5,12.5000273 C5,12.7761697 4.77614237,13.0000273 4.5,13.0000273 L3.5,13.0000273 C3.22385763,13.0000273 3,12.7761697 3,12.5000273 C3,12.2238849 3.22385763,12.0000273 3.5,12.0000273 Z M3.5,15.0000273 L4.5,15.0000273 C4.77614237,15.0000273 5,15.2238849 5,15.5000273 C5,15.7761697 4.77614237,16.0000273 4.5,16.0000273 L3.5,16.0000273 C3.22385763,16.0000273 3,15.7761697 3,15.5000273 C3,15.2238849 3.22385763,15.0000273 3.5,15.0000273 Z"
          id="Combined-Shape"
          data-spm-anchor-id="0.0.0.i27.4433201azyDC32"
        ></path>
      </svg>
    </span>
  );
};

export interface WrapperItemProps {
  /** 名称只读 */
  nameReadonly: boolean;
  /** 名称链接 对应 数据的某个key */
  nameLink?: string;
  displayField?: string;
  /** 可以编辑(显示编辑图标) */
  canEdit: boolean;
  /** 可以删除(显示删除图标) */
  canDelete: boolean;
  /** 拖拽 ref, 直接发布到想要拖拽的 dom 元素或者组件上 */
  drag: any;
  /** 目前只用于点击编辑按钮, popover-content 不消失 */
  itemRef: MutableRefObject<any>;

  data: IMultipleWrapperData<any>;
  onDelete: (item: any) => void;
  onChange: any;
  onEdit: (item?: any) => void;
}

function WrapperItem(props: WrapperItemProps) {
  const {
    displayField,
    nameReadonly = false,
    drag,
    data,
    onChange,
    onDelete,
    onEdit,
    itemRef,
    canDelete,
    canEdit,
    nameLink,
  } = props;

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [key]: event.target.value || ' ' });
  };

  const handleEditClick = () => {
    onEdit && onEdit(data);
  };

  return (
    <>
      {data.sortable && (
        <div ref={drag} className="sortable-handler">
          <SortableHandler />
        </div>
      )}
      <div className="multiple-wrapper-list-item-body">
        {data.icon && <Icon name={data.icon} />}
        <Input
          className="ant-input-rimless"
          readOnly={nameReadonly || !!nameLink}
          value={!!nameLink ? data.data[nameLink] : data[displayField!]}
          onChange={handleChange(displayField!)}
        />

        {canEdit && (
          <a ref={itemRef} onClick={handleEditClick}>
            EditOutlined
          </a>
        )}
        {canDelete && data.isPreset ? (
          <Checkbox style={{ marginLeft: '6px' }} checked={!data.isDelete} onClick={onDelete} />
        ) : (
          <a onClick={onDelete}>CloseOutlined</a>
        )}
      </div>
    </>
  );
}

WrapperItem.defaultProps = {
  canDelete: true,
  sortable: true,
  displayField: 'name',
};

export default memo(WrapperItem);
