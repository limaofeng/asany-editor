import { CSSProperties, ReactNode } from 'react';

export type InputText = string | any;
export interface RadiusAllSettingProps {
  onChange: (arr: InputText[]) => void;
  value: InputText[];
}
export enum radiusType {
  LeftTop = 'AsanyEditor/LeftTop',
  RightTop = 'AsanyEditor/RightTop',
  LeftBottom = 'AsanyEditor/LeftBottom',
  RightBottom = 'AsanyEditor/RightBottom',
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

export interface ListTreeProps {
  value?: string;
  reload?: boolean;
  labelName?: string;
  onChange?: (node: ListTreeNode) => void;
  treeData: ListTreeNode[];
  itemRender: React.ComponentType<ListTreeNodeRenderProps>;
  children?: React.ReactNode;
}

export interface SelectOption {
  label: string | React.ReactElement;
  value: string;
}

export interface SelectOptionGroup {
  label: string | React.ReactElement;
  options?: SelectOption[];
}

export type ElementType = string | React.ReactElement<any>;

export type Compare = (value: string, option: SelectOption) => boolean;

export interface SelectProps {
  popover?: React.ForwardRefExoticComponent<SelectPopoverProps & React.RefAttributes<unknown>>;
  popoverClassName?: string;
  className?: string;
  getOption?: (options: (SelectOption | SelectOptionGroup)[], value: string) => SelectOption;
  placeholder?: string;
  resultType?: 'object' | 'string';
  dropdownMatchSelectWidth?: boolean | number;
  options?: (SelectOption | SelectOptionGroup)[];
  compare?: Compare;
  onChange?: (value: string) => void;
  renderTitle?: (value?: SelectOption) => ElementType;
  icon?: ElementType;
  value?: string;
}

export type OptionCompare = (option: SelectOption) => boolean;

export interface SelectPopoverProps {
  close: () => void;
  value?: string;
  visible: boolean;
  onChange: (value: any) => void;
  options: (SelectOption | SelectOptionGroup)[];
  compare: OptionCompare;
}
