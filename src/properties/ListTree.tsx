import React, { useCallback, useEffect, useState } from 'react';

import Icon from '@asany/icons';
import classnames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { ListTreeNode, ListTreeProps } from './typings';

function getSelectKeys(treeData: ListTreeNode[], key: string): string[] {
  for (const node of treeData) {
    if (node.id === key) {
      return [node.id];
    }
    if (node.children?.length) {
      const childKeys = getSelectKeys(node.children, key);
      if (childKeys.length) {
        return [node.id, ...childKeys];
      }
    }
  }
  return [];
}

function ListTree(props: ListTreeProps) {
  const { reload, treeData, labelName = 'label', keyName = 'id', itemRender: ItemRender, onChange, value } = props;

  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [parentNode, setParentNode] = useState<ListTreeNode>();
  const [list, setList] = useState<ListTreeNode[]>([]);

  useEffect(() => {
    let parentNode;
    setList(
      openKeys.reduce((list, key) => {
        const node = list.find((item) => item.id === key);
        if (node) {
          parentNode = node;
          return node.children || [];
        }
        return list;
      }, treeData)
    );
    setParentNode(parentNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData, openKeys.join(',')]);

  const handleClick = useCallback(
    (selectKeys: string[]) => () => {
      setOpenKeys(selectKeys);
    },
    []
  );

  const handleChange = useCallback(
    (key: string) => {
      const selectKeys = getSelectKeys(treeData, key);
      setSelectKeys(selectKeys);
      const node = selectKeys.reduce((list: any, key: any) => {
        if (!list.length) {
          return list;
        }
        const node = list.find((item: any) => item.id === key);
        if (node && node.children?.length) {
          return node.children;
        }
        return node;
      }, treeData);
      console.log('selectKeys', selectKeys, node);
      onChange && node && onChange(node as any);
    },
    [treeData, onChange]
  );

  const handleBack = useCallback(() => {
    openKeys.pop();
    setOpenKeys([...openKeys]);
  }, [openKeys]);

  useEffect(() => {
    if (!value || !reload) {
      setOpenKeys([]);
      setSelectKeys([]);
      return;
    }
    const selectKeys = getSelectKeys(treeData, value);
    setSelectKeys(selectKeys);
    const openKeys = [...selectKeys];
    openKeys.pop();
    setOpenKeys(openKeys);
  }, [treeData, value, reload]);

  const dirs = list.filter((item) => !!(item.children || []).length);

  console.log(dirs, list, parentNode);

  return (
    <div className="list-tree-container">
      {parentNode && (
        <div onClick={handleBack} className="tree-current-node tw-flex tw-items-center">
          <Icon name="AsanyEditor/Drillup" />
          <span className="tw-flex-1">{parentNode[labelName]}</span>
        </div>
      )}
      <OverlayScrollbarsComponent className="list-tree-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        {!!dirs.length && (
          <ul className="ae-tree">
            {dirs.map((item) => (
              <li
                key={item.id}
                className={classnames('tw-flex tw-items-center', {
                  active: selectKeys.includes(item.id),
                })}
                onClick={handleClick([...openKeys, item.id])}
              >
                <Icon name="AsanyEditor/Folder" />
                <span className="flex-1">{item[labelName]}</span>
                <Icon name="AsanyEditor/Drilldown" />
              </li>
            ))}
          </ul>
        )}
        <div className="tree-node-content">
          <ul className="tree-node-item-list tw-flex tw-flex-row tw-flex-wrap tw-content-start">
            {list
              .filter((item) => !(item.children || []).length)
              .map((item) => (
                <ItemRender
                  {...item}
                  key={item[keyName]}
                  keyName={keyName}
                  selected={selectKeys.includes(item[keyName])}
                  onChange={handleChange}
                />
              ))}
          </ul>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default ListTree;
