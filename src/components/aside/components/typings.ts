import { CSSProperties, ReactNode } from 'react';

export type InputText = string | any;
export interface RadiusAllSettingProps {
  onChange: (arr: InputText[]) => void;
  value: InputText[];
}
export enum radiusType {
  LeftTop = 'LeftTop',
  RightTop = 'RightTop',
  LeftBottom = 'LeftBottom',
  RightBottom = 'RightBottom',
}
export enum IconsConst {
  X = 'x',
  Y = 'y',
  W = 'w',
  H = 'h',
  Rotate = 'rotate',
  Radius = 'radius',
  Clipping = 'clipping',
  Notch = 'notch',
  Semicircle = 'semicircle',
}
export const MIXED = 'Mixed';
export type radiusArr = InputText[];

export interface InputFormat {
  input?(value: InputText): string;
  output?(value: string): any;
}

export interface DeviceListProps {
  onChange: (value: any) => void;

  format?: any;
  list: any[];
  value?: any;
  overlayClassName?: string;
  maskChange?: () => void;
  selectConditions?: any;
}
export interface DsignSelectProps {
  children?: ReactNode;
  onChange: (state: any) => void;
  title: string;
  icon?: string;
  style?: CSSProperties;
  format?: any;
  list: any[];
  value?: any;
  overlayClassName?: string;
  selectConditions?: any;
}
