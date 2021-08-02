import Icon from '@asany/icons';
import classnames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useCallback, useEffect, useState } from 'react';

export interface ListTreeNode {
  id: string;
  name?: string;
  label?: string;
  children?: ListTreeNode[];
  [key: string]: any;
}

export interface ListTreeNodeRenderProps {
  id: string;
  selected: boolean;
  onChange: (id: string) => void;
}

interface ListTreeProps {
  value?: string;
  reload?: boolean;
  labelName?: string;
  onChange?: (node: ListTreeNode) => void;
  treeData: ListTreeNode[];
  itemRender: React.ComponentType<ListTreeNodeRenderProps>;
  children?: React.ReactNode;
}

function getSelectKeys(treeData: ListTreeNode[], key: string): string[] {
  for (const node of treeData) {
    if (node.id == key) {
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
  const { reload, treeData, labelName = 'label', itemRender: ItemRender, onChange, value } = props;

  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [parentNode, setParentNode] = useState<ListTreeNode>();
  const [list, setList] = useState<ListTreeNode[]>([]);

  useEffect(() => {
    let parentNode;
    setList(
      openKeys.reduce((list, key) => {
        const node = list.find((item) => item.id == key);
        if (node) {
          parentNode = node;
          return node.children || [];
        }
        return list;
      }, treeData)
    );
    setParentNode(parentNode);
  }, [openKeys.join(',')]);

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
        const node = list.find((item: any) => item.id == key);
        if (node && node.children?.length) {
          return node.children;
        }
        return node;
      }, treeData);
      console.log('selectKeys', selectKeys, node);
      onChange && node && onChange(node as any);
    },
    [treeData]
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
    console.log('useEffect', selectKeys, openKeys);
  }, [treeData, value, reload]);

  const dirs = list.filter((item) => !!(item.children || []).length);

  console.log(dirs, list, parentNode);

  return (
    <div className="list-tree-container">
      {parentNode && (
        <div onClick={handleBack} className="tree-current-node flex items-center">
          <Icon name="Drillup" />
          <span className="flex-1">{parentNode[labelName]}</span>
        </div>
      )}
      <OverlayScrollbarsComponent className="list-tree-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        {!!dirs.length && (
          <ul className="ae-tree">
            {dirs.map((item) => (
              <li
                key={item.id}
                className={classnames('flex items-center', {
                  active: selectKeys.includes(item.id),
                })}
                onClick={handleClick([...openKeys, item.id])}
              >
                <Icon name="Folder" />
                <span className="flex-1">{item[labelName]}</span>
                <Icon name="Drilldown" />
              </li>
            ))}
          </ul>
        )}
        {/* {parentNode && ( */}
        <div className="tree-node-content">
          <ul className="tree-node-item-list flex flex-row flex-wrap content-start">
            {list
              .filter((item) => !(item.children || []).length)
              .map((item) => (
                <ItemRender {...item} key={item.id} selected={selectKeys.includes(item.id)} onChange={handleChange} />
              ))}
          </ul>
        </div>
        {/* )} */}
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default ListTree;
