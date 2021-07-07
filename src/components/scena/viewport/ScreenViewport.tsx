import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { InputNumber, Popover } from 'antd';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import React, { useCallback, useState } from 'react';

import devices from '../../../assets/devices';
import { useDispatch, useSelector } from '../../../hooks';
import { UIActionType } from '../../../reducers/actions';
import { DeviceScreen } from '../../../typings';
import Screen from '../Screen';

interface DeviceListProps {
  value: DeviceScreen;
  onChange: (value: DeviceScreen) => void;
}

/**
 * 设备列表
 * @param props
 */
export function DeviceList(props: DeviceListProps) {
  const { value, onChange } = props;

  const handleClick = (device: DeviceScreen) => () => {
    onChange(device);
  };

  const types = devices.reduce((l: any, r: any) => {
    let type = l.find((item: any) => item.name === r.device[1]);
    if (!type) {
      l.push(
        (type = {
          name: r.device[1],
          children: [],
        })
      );
    }
    type.children.push(r);
    return l;
  }, []);
  return types.map((item: any) => (
    <div key={item.name} className="screen-picker-device-type">
      <span className="screen-picker-device-header">
        {item.name.toUpperCase()}
      </span>
      <ul>
        {item.children.map((device: DeviceScreen) => (
          <li key={device.id} onClick={handleClick(device)}>
            {value.id === device.id && <CheckOutlined />}
            <span className="device-name">{device.name}</span>
            <span className="device-size">{device.size.join('x')}</span>
          </li>
        ))}
      </ul>
    </div>
  ));
}

interface ScreenSizeProps {
  label: string;
  value: number;
}

/**
 * 屏幕尺寸调整组件
 * @param props
 */
function ScreenSize(props: ScreenSizeProps) {
  const { label, value } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <label className={classnames({ 'is-active': focused })}>
      <span className="title">{label}</span>
      <InputNumber
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        size="small"
      />
    </label>
  );
}

/**
 * 屏幕选择组件
 * @param props
 */
function DeviceScreenPicker() {
  const dispatch = useDispatch<string>();
  const [visible, setVisible] = useState(false);
  const screen = useSelector((state) => state.ui.scena.screen);
  const [width, height] = screen.size;
  const handleClick = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const handleChangeValue = useCallback((value: DeviceScreen) => {
    dispatch({
      type: UIActionType.ChangeScreenSize,
      payload: value,
    });
    setVisible(false);
  }, []);

  return (
    <div className="screen-picker">
      <Popover
        placement="bottom"
        visible={visible}
        overlayClassName="screen-picker-popover-devices"
        content={<DeviceList value={screen} onChange={handleChangeValue} />}
        transitionName=""
      >
        <div className="screen-picker-current" onClick={handleClick}>
          <div className="screen-picker-item">
            {screen && (
              <>
                <div className="screen-picker-icon" />
                <div className="screen-picker-device">
                  <div className="screen-picker-device-name">{screen.name}</div>
                  <div className="screen-picker-device-size">
                    {screen.size.join('x')}
                  </div>
                </div>
              </>
            )}
          </div>
          <span className="screen-picker-more">
            <DownOutlined />
          </span>
        </div>
      </Popover>
      <div className="screen-size">
        <ScreenSize label="W" value={width} />
        <ScreenSize label="H" value={height} />
      </div>
    </div>
  );
}

export const ScreenPicker = React.memo(DeviceScreenPicker);

export interface ScreenProps {
  children?: JSX.Element;
}

interface ScreenViewportProps {
  children: JSX.Element;
  width?: number;
  height?: number;
  zoom?: number;
  scrollX?: number;
  scrollY?: number;
}

function ScreenViewport(props: ScreenViewportProps) {
  const isZoom = useSelector((state) => state.features.zoom);
  const { children, scrollX = 0, scrollY = 0, width, height } = props;
  return (
    <div
      className="screen-viewport"
      style={
        isZoom
          ? {
              width,
              height,
              transform: `matrix(1, 0, 0, 1, ${scrollX}, ${scrollY})`,
            }
          : {}
      }
    >
      <Screen>{children}</Screen>
    </div>
  );
}

export default React.memo(
  ScreenViewport,
  (
    { children: prevChildren, ...prevProps }: ScreenViewportProps,
    { children: nextChildren, ...nextProps }: ScreenViewportProps
  ) => {
    return prevChildren === nextChildren && isEqual(prevProps, nextProps);
  }
);
