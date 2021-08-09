import { useQuery } from '@apollo/client';
import Icon, { IconLibrary } from '@asany/icons';
import { Dropdown, Menu, Spin } from 'antd';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Selecto from 'react-selecto';
import { useSelector } from '../../../hooks';
import Sortable, { SortableItemProps } from '@asany/sortable';

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

const IconMosaic = forwardRef((props: IconThumbProps, ref: any) => {
  const { drag } = props;
  const { selected, onClick, ...icon } = props.data;
  console.log('icon', icon.name, selected);
  const handleClick = () => {
    console.log('handleClick', icon, onClick);
    onClick(icon.id);
  };
  return (
    <div ref={drag(ref)} className={classnames('icon-mosaic', { selected })} data-key={icon.id}>
      <span
        onClick={handleClick}
        role="img"
        className="anyicon icon-thumb"
        aria-label={icon.name}
        dangerouslySetInnerHTML={{
          __html: icon.content,
        }}
      />
    </div>
  );
});

function LibraryDetails() {
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const mosaicContainer = useRef<HTMLDivElement>(null);
  const selecto = useRef<Selecto>(null);
  const params = useParams<{ id: string }>();
  const [icons, setIcons] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set<string>());
  const selectoEnabled = useSelector((state) => state.workspace.icon.selecto);
  const moveEnabled = useSelector((state) => state.workspace.icon.move);
  const id = params.id || '555'; // TODO: 调试完成后，去掉固定变量

  console.log('selectoEnabled', selectoEnabled);

  const { data, loading } = useQuery<{ library: IconLibrary }>(GET_LIBRARY_DETAILS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!data?.library.icons || !data.library.icons.length) {
      return;
    }
    console.log('rechange icons');
    setIcons(
      data.library.icons.map((item) => ({
        ...item,
        selected: selectedKeys.has(item.id!),
        id: item.id!,
        type: 'sortable-card',
        onClick: handleIconClick,
      }))
    );
  }, [data?.library.icons, Array.from(selectedKeys).join(',')]);

  const popupContainer = useCallback(() => dropdownContainer.current!, []);

  const handleIconClick = useCallback((key: string) => {
    // setSelectedKeys((selectedKeys) => {
    //   if (selectedKeys.has(key)) {
    //     selectedKeys.delete(key);
    //   } else {
    //     selectedKeys.add(key);
    //   }
    //   return new Set(selectedKeys);
    // });
  }, []);

  const handleMenuClick = useCallback(() => {}, []);

  const handleChange = useCallback((data, event) => {
    console.log(data, event);
  }, []);

  const { library } = data || {};

  // const icons = library?.icons || [];
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
          <div ref={mosaicContainer} className="mosaic-container">
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
                items={icons}
                onChange={handleChange}
                itemRender={IconMosaic}
              />
            </div>
            {/* <Selecto
              ref={selecto}
              // The container to add a selection element
              container={mosaicContainer.current}
              // The area to drag selection element (default: container)
              dragContainer={mosaicContainer.current!}
              // Targets to select. You can register a queryselector or an Element.
              selectableTargets={['.icon-mosaic']}
              // Whether to select by click (default: true)
              selectByClick={true}
              // Whether to select from the target inside (default: true)
              selectFromInside={true}
              // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
              continueSelect={false}
              // Determines which key to continue selecting the next target via keydown and keyup.
              toggleContinueSelect={'shift'}
              // The container for keydown and keyup events
              keyContainer={window}
              dragCondition={() => selectoEnabled}
              // The rate at which the target overlaps the drag area to be selected. (default: 100)
              hitRate={0}
              onSelect={(e) => {
                setSelectedKeys((selectedKeys) => {
                  e.added.map((item) => item.dataset['key']!).forEach(selectedKeys.add.bind(selectedKeys));
                  e.removed.map((item) => item.dataset['key']!).forEach(selectedKeys.delete.bind(selectedKeys));
                  return new Set<string>(selectedKeys);
                });
              }}
            /> */}
          </div>
        </OverlayScrollbarsComponent>
        <div className="control-panel">sdfsdf</div>
      </Spin>
    </div>
  );
}

export default React.memo(LibraryDetails);
