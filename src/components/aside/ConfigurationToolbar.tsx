import { Popover } from 'antd';
import React, { useCallback, useRef } from 'react';

import { ComponentPropertyType } from '../../library/typings';
import { useDispatch, useSelector } from '../../hooks';
import FormPanel from './FormPanel';
import { ActionType, UIActionType } from '../../reducers/actions';

function EditableZoom() {
  const dispatch = useDispatch();
  const zoom = useSelector((state) => state.ui.scena.zoom);
  const handleOut = useCallback(() => {
    dispatch({
      type: UIActionType.CanvasZoomOut,
    });
  }, []);
  const handleIn = useCallback(() => {
    dispatch({
      type: UIActionType.CanvasZoomIn,
    });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log((e.target as any).value.replace(/[%]^/i, ''));
  };
  return (
    <div className="editable-zoom-group-wrapper">
      <button className="zoom-out" onClick={handleOut}>
        <svg id="zoom-out" className="icon-zoom-out" width={16} height={16}>
          <svg>
            <path d="M8 1c0 0.5-0.5 1-1 1H1C0.5 2 0 1.5 0 1s0.5-1 1-1h6C7.5 0 8 0.5 8 1z" />
          </svg>
        </svg>
      </button>
      <div className="editable-zoom">
        <input type="text" onChange={handleChange} value={`${Math.floor(zoom * 100)}%`} />
      </div>
      <button className="zoom-in" onClick={handleIn}>
        <svg id="zoom-in" className="icon-zoom-in" width={16} height={16}>
          <svg>
            <path d="M8 4c0 0.5-0.5 1-1 1H5v2c0 0.5-0.5 1-1 1S3 7.5 3 7V5H1C0.5 5 0 4.5 0 4s0.5-1 1-1h2V1c0-0.5 0.5-1 1-1s1 0.5 1 1v2h2C7.5 3 8 3.5 8 4z" />
          </svg>
        </svg>
      </button>
    </div>
  );
}

function Guides() {
  const ruler = useSelector((state) => state.features.ruler);
  const customizer = useRef({
    fields: [
      {
        name: 'ruler',
        label: '标尺',
        type: ComponentPropertyType.Boolean,
      },
    ],
  });
  const dispatch = useDispatch();
  const handleChange = (value: any) => {
    dispatch({ type: ActionType.FeatureRuler, payload: value.ruler });
  };
  return (
    <div>
      <FormPanel value={{ ruler }} onChange={handleChange} customizer={customizer.current} />
    </div>
  );
}

interface ConfigurationToolbarProps {
  children?: React.ReactNode;
}

function ConfigurationToolbar({ children }: ConfigurationToolbarProps) {
  return (
    <div className="settings-footer">
      {children}
      <div className="settings-footer-heading-footer">
        <EditableZoom />
        <div className="guides">
          <Popover
            overlayClassName="guides-popover"
            placement="topLeft"
            // tslint:disable-next-line:jsx-no-lambda
            getPopupContainer={() => document.getElementsByClassName('settings-footer')[0] as any}
            content={<Guides />}
            transitionName=""
            trigger="click"
          >
            <button>
              <span className="icon-container">
                <svg id="guides" width={16} height={16}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
                    <path d="M0 8V0h1v8zm2 0V0h1v8zm3 0V0h1v8zm2 0V0h1v8zm3 0V0h1v8zm3 0V0h-1v8z" />
                  </svg>
                </svg>
              </span>
              指南
            </button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationToolbar;
