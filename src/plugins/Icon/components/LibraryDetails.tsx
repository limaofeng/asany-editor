import { useQuery } from '@apollo/client';
import Icon, { IconLibrary } from '@asany/icons';
import Sortable, { SortableItemProps } from '@asany/sortable';
import { Dropdown, Menu, Spin } from 'antd';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { forwardRef, memo, useCallback, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Selecto from 'react-selecto';

import { useSelector } from '../../../hooks';
import LibraryControlPanel from './LibraryControlPanel';

const GET_LIBRARY_DETAILS = gql`
  query library($id: ID!) {
    library: iconLibrary(id: $id) {
      id
      name
      description
      total
      icons {
        id
        name
        description
        unicode
        content
      }
    }
  }
`;

interface IconThumbProps extends SortableItemProps<any> {
  icon: any;
  selected: boolean;
}

const IconMosaic = memo(
  forwardRef((props: IconThumbProps, ref: any) => {
    const { drag, icon, selected, className, clicked } = props;
    return (
      <div
        ref={drag(ref)}
        className={classnames(
          'icon-mosaic',
          { selected, 'sortable-item-dragging': clicked && !className?.includes('sortable-item-dragging') },
          className
        )}
        data-key={icon.id}
      >
        <span
          role="img"
          className="anyicon icon-thumb"
          aria-label={icon.name}
          dangerouslySetInnerHTML={{
            __html: icon.content,
          }}
        />
      </div>
    );
  })
);

function LibraryDetails() {
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const mosaicContainer = useRef<HTMLDivElement>(null);
  const temp = useRef<{ selecto?: boolean; move?: boolean; selectedKeys: Set<string> }>({ selectedKeys: new Set() });
  const selecto = useRef<Selecto>(null);
  const params = useParams<{ id: string }>();
  // const [icons, setIcons] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set<string>());

  temp.current.selecto = useSelector((state) => state.workspace.icon.selecto);
  temp.current.move = useSelector((state) => state.workspace.icon.move);
  temp.current.selectedKeys = selectedKeys;

  const id = params.id || '555'; // TODO: 调试完成后，去掉固定变量

  const { data, loading } = useQuery<{ library: IconLibrary }>(GET_LIBRARY_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const popupContainer = useCallback(() => dropdownContainer.current!, []);

  const handleMenuClick = useCallback(() => {}, []);

  const handleChange = useCallback((_, event) => {
    // console.log('sort change', event);
  }, []);

  const { library } = data || {};

  const handleSelectoDragCondition = useCallback(() => !!temp.current.selecto, []);

  const handleMoveDragCondition = useCallback(() => !!temp.current.move, []);

  return (
    <div className="ie-libraries ie-library-details">
      <Spin spinning={loading}>
        <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
          <div className="libraries-header-section">
            <div className="library-left">
              <h1 className="libraries-header">
                <Link to="/libraries">Libraries</Link>
                <Icon className="icon-arrow" name="Ion/chevron-right" />
                <span className="library-current">{library?.name}</span>
              </h1>
              <div className="subheading">
                <span className="library-detail-header-library-total-count-text">{library?.total} items</span>
              </div>
            </div>
            <div className="library-right" ref={dropdownContainer}>
              <Dropdown
                transitionName=""
                trigger={['click']}
                placement="bottomRight"
                getPopupContainer={popupContainer}
                overlay={
                  <Menu onClick={handleMenuClick}>
                    <Menu.Item key="rename">Rename Library</Menu.Item>
                    <Menu.Item key="delete">Delete Library</Menu.Item>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link">
                  <Icon name="Ion/navicon" />
                </a>
              </Dropdown>
            </div>
          </div>
          <div
            ref={mosaicContainer}
            className={classnames('mosaic-container', {
              'feature-move': temp.current.move,
              'feature-selecto': temp.current.selecto,
            })}
          >
            <div className="icon-mosaic-set">
              <div className="ims-header-section">
                <span className="ims-hs-title">title</span>
                <div className="ims-hs-actions">{/* <Icon name="Ion/navicon" /> */}</div>
              </div>
              <Sortable
                accept={['sortable-card']}
                tag="div"
                className="ims-header-body"
                layout="grid"
                style={{ listStyle: 'none', padding: 0 }}
                items={library?.icons || []}
                onChange={handleChange}
                dragCondition={handleMoveDragCondition}
                itemRender={(props, ref) => (
                  <IconMosaic
                    {...props}
                    icon={props.data}
                    selected={temp.current.selectedKeys.has(props.data.id)}
                    ref={ref}
                  />
                )}
              />
            </div>
            <Selecto
              ref={selecto}
              container={mosaicContainer.current}
              dragContainer={mosaicContainer.current!}
              selectableTargets={['.icon-mosaic']}
              selectByClick={true}
              selectFromInside={true}
              continueSelect={false}
              toggleContinueSelect={'shift'}
              keyContainer={window}
              dragCondition={handleSelectoDragCondition}
              hitRate={0}
              onSelect={(e) => {
                setSelectedKeys((selectedKeys) => {
                  e.added.map((item) => item.dataset['key']!).forEach(selectedKeys.add.bind(selectedKeys));
                  e.removed.map((item) => item.dataset['key']!).forEach(selectedKeys.delete.bind(selectedKeys));
                  // 为了显示效果，通过 JSAPI 先直接修改样式
                  e.added.forEach((el) => el.classList.add('selected'));
                  e.removed.forEach((el) => el.classList.remove('selected'));
                  return new Set<string>(selectedKeys);
                });
              }}
            />
          </div>
        </OverlayScrollbarsComponent>
        <div className="control-panel sketch-configuration">
          <LibraryControlPanel />
        </div>
      </Spin>
    </div>
  );
}

export default React.memo(LibraryDetails);
