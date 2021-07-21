import React, { memo, MutableRefObject } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { IMultipleWrapperData } from './MultipleWrapper';
// import ComponentPicker from '../../component-picker';
import { useReactComponent } from '@asany/library-manager';
import { SortableHandler } from './WrapperItem';

export interface WrapperItemProps {
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
  tagPrefix: string;
}

function WrapperItem(props: WrapperItemProps) {
  const { drag, data, onDelete, canDelete } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {data.sortable && (
        <div ref={drag} className="sortable-handler">
          <SortableHandler />
        </div>
      )}
      {/* <ComponentPicker
        // tagPrefix={tagPrefix}
        value={data?.componentId}
        onChange={(componentId) => {
          onChange({ ...data, componentId });
        }}
      /> */}
      {canDelete && (
        <a onClick={onDelete}>
          <CloseOutlined />
        </a>
      )}
    </div>
  );
}

WrapperItem.defaultProps = {
  canDelete: true,
  sortable: true,
  displayField: 'name',
};

export default memo(WrapperItem);

export const AnyComponent = (props: { componentId?: string }) => {
  const Renderer = useReactComponent(props.componentId ?? '');
  if (Renderer) {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <Renderer />
      </div>
    );
  } else return null;
};
