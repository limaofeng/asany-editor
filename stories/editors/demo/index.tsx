import React from 'react';

import { EditorPlugin } from '../../../src/typings';
import reducer from './reducer';

export default {
  id: 'demo',
  description: '',
  types: ['demo'],
  toolbar: {
    tools: [
      {
        id: 'left',
        name: <div style={{ color: '#727d83', fontSize: 16 }}>头部菜单栏</div>,
        position: 'left',
        style: {
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
        },
      },
    ],
  },
  reducer: reducer,
  sidebar: {
    content: () => {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#727d83',
            fontSize: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span>侧边面板</span>
            <span style={{ fontSize: 10, marginTop: 20 }}>右侧边缘可以调整面板宽度</span>
          </div>
        </div>
      );
    },
    tools: [
      {
        id: 'top',
        icon: () => (
          <div
            style={{
              wordWrap: 'break-word',
              wordBreak: 'break-all',
              width: 14,
              color: '#727d83',
            }}
          >
            左侧快捷栏
          </div>
        ),
        style: { height: '100%' },
        position: 'top',
      },
      {
        id: 'bottom',
        icon: 'HandTouchSolid',
        position: 'bottom',
        onClick: (editor) => {
          editor.sidebar.open('bottom', '弹出面板', () => {
            return (
              <div
                style={{
                  color: '#727d83',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                弹出面板
              </div>
            );
          });
        },
      },
    ],
  },
  scena: {
    workspace: () => {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            color: '#727d83',
            fontSize: 18,
            paddingTop: 20,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            工作区
            <div style={{ fontSize: 12, paddingTop: 10 }}>点击工作区，可以唤出属性配置面板</div>
          </div>
        </div>
      );
    },
    toolbar: {
      tools: [
        {
          id: 'left',
          name: <div style={{ color: '#727d83', fontSize: 16 }}>二级菜单栏</div>,
          mutex: 'left',
          style: { flex: 1, display: 'flex', justifyContent: 'center' },
        },
      ],
    },
    /*     onClick: (editor) => {
      editor.aside.open(
        '属性面板',
        () => {
          return (
            <div
              style={{
                padding: 8,
                color: '#727d83',
                fontSize: 16,
                height: 'calc(100vh - 270px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>属性面板</span>
            </div>
          );
        },
        {
          width: 380,
        }
      );
    }, */
  },
  features: ['ruler'],
} as EditorPlugin;
