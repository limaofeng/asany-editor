import './style/index.less';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import React from 'react';

import { EditorPlugin } from '../../typings';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import reducer from './reducer';

export default {
  id: 'demo',
  description: '',
  types: ['demo'],
  toolbar: {
    content: Navigation,
  },
  reducer,
  sidebar: {
    visible: false,
    content: Sidebar,
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
    workspace: Workspace,
    /*  onClick: (editor) => {
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
  features: [],
} as EditorPlugin;
