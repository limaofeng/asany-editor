import { ComponentType, CSSProperties, ReactElement } from 'react';
import {
  OnDragEnd,
  OnResize,
  OnResizeEnd,
  OnResizeStart,
} from 'react-moveable';
import { Frame } from 'scenejs';

import { DispatchWithoutAction, IAsanyStoreContext } from './AsanyContext';
import { IUseBlockState } from './hooks/useBlock';
import { Selector } from './hooks/useSelector';
import MoveableState from './reducers/ui.reducer/scena.reducer/MoveableState';
// import { IUIScenaState } from './reducers/ui.reducer/scena.reducer';
// import { IUISidebarState } from './reducers/ui.reducer/sidebar.reducer';
// import { IUIToolbarState } from './reducers/ui.reducer/toolbar.reducer';
import MoveableData from './utils/MoveableData';

export interface AsanyAction<T> {
  type: T;
  payload?: any;
}

export const father = 'root';

export interface IUpdateBlockData {
  title: any;
  key: string;
  props: any;
  customizer: any;
}

export interface IComponent {
  // 组件名称
  id: string;
  name: string;
  group?: string;
  icon?: string;
  component: any;
  // 组件标签
  tags?: string[];
  drag?: {
    size: {
      w: number;
      h: number;
    };
  };
  /**
   * 权重
   */
  boost?: number;
  /**
   * 可以使用的子组件
   */
  symbols?: string[];
  /**
   * 配置属性定义
   */
  props?: IComponentProperty[];
}

export interface IBlockState {
  version: number;
  component: string;
  info: IComponent;
  activeKey?: string;
  blocks: IBlockData<any>[];
  stack: string[];
}

export interface IBlockDataProps {
  frame?: Frame;
  [key: string]: any;
}

export interface IBlockData<T> {
  key: string;
  icon: string;
  title: string;
  props?: T;
  customizer?: ICustomizer;
  version?: number;
  options?: {
    /**
     * 当前 Block 可以拖入的配置信息
     * 该配置信息，并不实现拖拽功能。拖入功能需要组件自己实现。该配置信息主要是辅助生成组件面板信息
     */
    drop?: ComponentDropConfig;
    resizable?: boolean;
    draggable?: boolean;
    /**
     * 当启用 resizable || draggable 及后, 组件的渲染逻辑
     */
    render?: (target: HTMLElement | SVGElement, frame: Frame) => void;
    onResizeStart?: (e: OnResizeStart) => void;
    onResize?: (e: OnResize) => void;
    onResizeStop?: (e: OnResizeEnd) => void;
    onDragStop?: (e: OnDragEnd) => void;
  };
}

export interface IBlockOptions<T> extends IBlockData<T> {}

export interface IFieldGroup {
  id: string;
  name?: string;
  visible?: boolean | VisibleFunc;
  layout?: 'Inline' | 'Stacked';
}

export const DEFAULT_GROUP_ID = 'DEFAULT';
export const DEFAULT_TABPANE_ID = 'DEFAULT';

export interface ITabPane {
  name: string;
  visible?: boolean | VisibleFunc;
  groups: string[] | IFieldGroup[];
  customizer?: ICustomizer;
}

export interface ICustomizer {
  /**
   * 展示画框详情
   */
  frame?: boolean;
  dynamic?: boolean;
  tabs?: ITabPane[];
  /**
   * 字段分组设置
   */
  groups?: IFieldGroup[];
  /**
   * 配置字段
   */
  fields: IComponentProperty[];
}

/**
 * 工具位置: 头部左边, 头部右边, 左边头部, 左边底部
 */
export type ToolPosition = 'left' | 'right' | 'top' | 'bottom';

export interface ToolPanel {
  key: string;
  title: string;
  body: ComponentType<any>;
}

export type UndoFunc = (editor: IAsanyEditor) => void;

export type ToolClick = (editor: IAsanyEditor) => UndoFunc | void;

export interface AsanyTool {
  /**
   * 工具 ID
   */
  id: string;
  /**
   * 工具图标，可以使用组件
   */
  icon?: any;
  /**
   * 工具名称
   */
  name?: string | React.ReactElement;
  /**
   * 是否可见
   */
  isVisibled?: (state: any) => boolean;
  /**
   * 是否禁用
   */
  isDisabled?: (state: any) => boolean;
  /**
   * 是否选中
   */
  isSelected?: (state: any) => boolean;
  /**
   * 工具位置
   */
  position?: ToolPosition;
  /**
   * 关注的值，会传递到 isVisibled / isDisabled / isSelected 的参数
   * 因为需要相应状态变化，需要设置该属性，不然可能出现页面不刷新的问题
   */
  useSelector?: Selector<any>;
  /**
   * 互斥标示，同一组的按钮，选中会出现互斥的效果
   */
  mutex?: string;
  /**
   * 点击事件
   */
  onClick?: ToolClick;
  /**
   * 取消选中函数，一般自动生成
   */
  deselect?: UndoFunc | void;
  /**
   * 自定义渲染逻辑
   */
  render?: (item: AsanyToolData) => React.ReactElement;
  /**
   * 样式
   */
  className?: string;
  /**
   * 样式
   */
  style?: CSSProperties;
}

export type AsanyToolData = {
  /**
   * 工具 ID
   */
  id: string;
  /**
   * 工具图标，可以使用组件
   */
  icon?: any;
  /**
   * 工具名称
   */
  name?: string;
  /**
   * 是否可见
   */
  visibled?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否选中
   */
  selected?: boolean;
  /**
   * 工具位置
   */
  position?: ToolPosition;
  /**
   * 关注的值，会传递到 isVisibled / isDisabled / isSelected 的参数
   * 因为需要相应状态变化，需要设置该属性，不然可能出现页面不刷新的问题
   */
  useSelector?: Selector<any>;
  /**
   * 互斥标示，同一组的按钮，选中会出现互斥的效果
   */
  mutex?: string;
  /**
   * 点击事件
   */
  onClick: any;
  /**
   * 取消选中函数，一般自动生成
   */
  deselect: UndoFunc | void;
};

export type Feature = 'zoom' | 'block' | 'ruler' | 'selecto' | 'drag';

type Reducer = (state: any, action: any) => any;

export interface ISidebar {
  /**
   * 侧边面板默认宽度
   */
  width?: number;
  /**
   * 侧边栏最小宽度
   */
  minWidth?: number;
  /**
   * 侧边面板最小化
   * 逻辑为 向右移动至 minWidth/2 位置
   */
  minimizable?: boolean;
  /**
   * 侧边工具栏
   */
  tools?: AsanyTool[];
  /**
   * 侧边栏组件
   */
  content?: React.ComponentType;
  /**
   * 侧边栏是否可见， 默认： true
   */
  visible?: boolean;
}

export interface IToolbar {
  tools?: AsanyTool[];
}

export interface EditorPlugin {
  id: string;
  description: string;
  features?: Feature[];
  reducer?: Reducer;
  toolbar?: IToolbar;
  sidebar?: ISidebar;
  scena?: IScena;
  aside?: ComponentType;
  types: AsanyProjectType[];
}

export interface IScena {
  toolbar?: {
    tools?: AsanyTool[];
    visible?: boolean;
  };
  workspace: ComponentType<any>;
  onClick(editor: IAsanyEditor, block?: IUseBlockState<any>): void;
}

export interface ToolsHelper {
  hasSelected(key: string): boolean;

  select(key: string, toolboard?: boolean): void;

  unselect(...keys: string[]): void;
}

export interface FeaturesHelper {
  has(feature: Feature): boolean;
  ruler(enable: boolean): void;
  zoom(enable: boolean): void;
  drag(enable: boolean): void;
  selecto(enable: boolean): void;
  block(enable: boolean): void;
}

export interface GuidelinesDataSet {
  horizontal: number[];
  vertical: number[];
}

export interface DeviceScreen {
  id: string;
  name: string;
  size: number[];
}

export interface UIScenaGlobalState {
  loading: boolean;
  // 缩放比例
  zoom: number;
  reset?: () => void;
  snaps: GuidelinesDataSet;
  // 屏幕设置
  screen: DeviceScreen;
  workspace?: ComponentType | ReactElement;
  // 点击事件
  onClick?: (editor: IAsanyEditor, block?: IUseBlockState<any>) => void;
}

export interface IUIScenaState extends UIScenaGlobalState {
  moveable: MoveableState;
  viewer: ViewerState;
  toolbar: IUIScenaToolbarState;
}

export interface ScenaHelper {
  state: IUIScenaState;
  toolbar: {
    has(key: ':visible'): boolean;
    /**
     * 设置工具栏是否可见
     * @param enable
     */
    visible(enable: boolean): void;
    /**
     * 选中菜单
     * @param key
     */
    select(key: string): void;
    /**
     * 取消选中
     * @param keys
     */
    unselect(...keys: string[]): void;
    /**
     * 设置工具栏
     * @param tools
     */
    tools(tools: AsanyTool[]): void;
    /**
     * 重设工具栏
     */
    reset(): void;
  };
  /**
   * 修改视窗大小
   */
  viewport(id: string): void;
  viewport(width: number, height: number): void;
  /**
   * 画布居中
   */
  reset(): void;
  /**
   * 显示 Loading
   */
  mask(): Promise<void>;
  /**
   * 隐藏 Loading
   * @param delay
   */
  unmask(delay?: number): Promise<void>;
}

export interface WorkspaceProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface SidebarHelper {
  state: IUISidebarState;
  /**
   * 设置可见性
   * @param visible
   */
  visible(visible: boolean): void;
  /**
   * 判断菜单是否选中
   * @param key
   */
  hasSelected(key: string): boolean;
  /**
   * 选中菜单
   * @param key
   * @param toolboard
   */
  select(key: string, toolboard?: boolean): void;
  /**
   * 取消选中
   * @param keys
   */
  unselect(...keys: string[]): void;
  open(
    toolKey: string,
    title: string,
    body: ComponentType<any>
  ): UndoFunc | void;
  next(content: ComponentType<any>, width?: number): void;
  next(title: string, content: ComponentType<any>): void;
  next(title: string, content: ComponentType<any>, width?: number): void;
  next(index: number, content: ComponentType<any>, width?: number): void;
  next(
    index: number,
    title: string,
    content: ComponentType<any>,
    width?: number
  ): void;
  close(index?: number): void;
  reopen(toolKey: string): void;
  /**
   * 设置侧栏面板
   */
  content(content: ComponentType, width?: number, minWidth?: number): void;
  /**
   * 取消保持功能
   */
  removeContent(): void;
  back(): void;
}

export interface PanelOptions {
  top?: number | 'auto';
  width?: number;
}

export interface AsideHelper {
  state: IUIAsideState;
  open(tabs: AsideTabPane[], options?: PanelOptions): void;
  open(title: string, body: ComponentType<any>, options?: PanelOptions): void;
  next(title: string, body: ComponentType<any>): void;
  close(): void;
}

export interface ToolbarHelper {
  state: IUIToolbarState;
  /**
   * 判断菜单是否选中
   * @param key
   */
  hasSelected(key: string): boolean;
  /**
   * 选中菜单
   * @param key
   */
  select(key: string): void;
  /**
   * 取消选中
   * @param keys
   */
  unselect(...keys: string[]): void;
}

export interface IAsanyEditor {
  save(project: AsanyProject): void;
  state: IAsanyState;
  store: IAsanyStoreContext<any>;
  toolbar: ToolbarHelper;
  /**
   * 编辑器功能
   */
  features: FeaturesHelper;
  /**
   * 左侧栏
   */
  sidebar: SidebarHelper;
  /**
   * 右边侧边栏
   */
  aside: AsideHelper;
  /**
   * 编辑区
   */
  scena: ScenaHelper;
  dispatch: DispatchWithoutAction<any>;
}

type AsanyProjectType = 'component' | 'application' | string;

interface IComponentData {
  id: string;
  props: any;
}

interface IRouteComponentData {}

export interface IRouteComponent extends IRoute {
  component: ComponentType;
}

export interface IRoute {
  id: string;
  path?: string;
  name?: string;
  type: 'menu' | 'header' | 'divider' | 'route';
  icon?: string;
  authorized: boolean;
  wrappers: any[];
  routes: any[] | undefined;
  exact: boolean;
  parent: any;
  index: number;
}

export interface IRouteData extends IRoute {
  component: IComponentData;
  configuration: IRouteComponentData;
}

interface IApplicationData {
  id?: string;
  routes: IRouteData[];
}

interface IRemoteData {
  uri: string;
  id: string;
}

interface AsanyProject {
  id: string;
  name: string;
  type: AsanyProjectType;
  data: IComponentData | IApplicationData | IRemoteData;
}

export interface ComponentDragObject {
  id: string;
  type: string;
  component: string;
  [key: string]: any;
}

export type CreateDragObjectFunc = (
  component: IComponent
) => ComponentDragObject;

export type IComponentLibrary = {
  tags: string[];
  drag?: {
    type?: string;
    dragObject?: CreateDragObjectFunc;
  };
};

export type IComponentDragObject = {
  title: string;
  type?: string;
  sorter?: ComponentSorter;
  selector: string | ComponentSelector;
  object?: CreateDragObjectFunc;
};

export type ComponentDropConfig = {
  /**
   * 设置为 true 时，只有选中 block 时， 组件面板才会显示对应的组件信息
   * 默认为 false
   */
  exclusive?: boolean;
  items: IComponentDragObject[];
};

export interface AsideTabPane {
  id?: string;
  title: string;
  visible?: boolean | Function;
  content: ComponentType<any>;
}

type DepType = ((state: any) => any | Promise<any>) | string[];

interface PluginOptions {
  merge: boolean;
}

export type ComponentSelector = (component: IComponent) => boolean;

export type ComponentSorter = (a: IComponent, b: IComponent) => number;

export type ComponentPropertyRendererSetting = {
  component: ComponentPropertyRenderer | ComponentType<any> | string;
  props: { [key: string]: any };
};

export type ComponentPropertyRenderer =
  | string
  | ComponentType<any>
  | ComponentPropertyRendererSetting
  | any;

export enum ComponentPropertyType {
  JSON = 'JSON',
  Text = 'Text',
  Image = 'Image',
  Integer = 'Integer',
  Boolean = 'Boolean',
  Float = 'Float',
  String = 'String',
  Date = 'Date',
  Enum = 'Enum',
  File = 'File',
}

export type VisibleFunc = (props: any) => boolean;

export type IComponentProperty = {
  // 字段名
  name: string;
  /**
   *  显示名称
   * 为空时，不在配置面板中显示
   */
  label?: string;
  /**
   * 布局
   */
  layout?: 'Inline' | 'Stacked';
  /**
   * 隐藏 Lable
   */
  hiddenLabel?: boolean;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 数据类型
   */
  type: ComponentPropertyType;
  /**
   * 渲染器
   */
  renderer?: ComponentPropertyRenderer;
  /**
   * 包装器， 用于实现数组类数据
   */
  wrappers?: ComponentPropertyRenderer[];
  // 是否为多项
  multiple?: boolean;
  // 引用枚举
  enumeration?: any;
  // 默认值
  defaultValue?: any;
  // 分组
  group?: string | boolean;
  // 必填
  required?: boolean;
  // 设置值
  value?: any;
  // value 对应的 props
  valuePropName?: string;
  // 依赖
  deps?: DepType;
  /**
   * 是否可见
   */
  visible?: boolean | VisibleFunc;
  /**
   * 钩子函数
   */
  hooks?: {
    options?: PluginOptions;
    init?: any;
    /**
     * 前置拦截
     */
    before?: any;
    /**
     * 转换器
     */
    convert?: any;
    /**
     * 后置拦截
     */
    after?: any;
  };
};

export type IReducer<T, D> = (state: T, action: AsanyAction<D>) => T;

export type AsanyProviderMode = 'VIEW' | 'CONFIG';

export interface IUIState {
  sidebar: IUISidebarState;
  aside: IUIAsideState;
  scena: IUIScenaState;
  toolbar: IUIToolbarState;
}

export interface IUIAsideState {
  control?: React.RefObject<any>;
  tabs: AsideTabPane[];
  options?: PanelOptions;
  visible: boolean;
}

export interface IFeatureState {
  zoom: boolean;
  ruler: boolean;
  block: boolean;
  drag: boolean;
  selecto: boolean;
}

export interface IToolboard {
  back(): Promise<void>;
  reopen(toolKey: string): void;
  open(key: string, title: string, content: ComponentType<any>): void;
  next(
    index: number,
    title: string | undefined,
    content: ComponentType<any>,
    width: number
  ): void;
  close(index?: number): void;
}

export interface IUISidebarState {
  minWidth: number;
  control?: React.RefObject<IToolboard>;
  library?: IComponentLibrary;
  tools: AsanyTool[];
  activeKeys: string[];
  width: number;
  minimizable: boolean;
  content?: React.ComponentType<any>;
  toolboardKey?: string;
  visible: boolean;
  api?: any;
}

export interface IUIScenaMoveableState {
  draggable: boolean;
  resizable: boolean;
  visible?: boolean;
  selectedTargets: Array<HTMLElement | SVGElement>;
  targets?: {
    id: string;
    element: React.RefObject<HTMLElement>;
  }[];
  data?: MoveableData;
}

export interface ViewerState {
  dustbin: string[];
}

export interface IUIScenaToolbarState {
  tools: AsanyTool[];
  activeKeys: string[];
  visible: boolean;
}

export interface IUIToolbarState {
  tools: AsanyTool[];
  activeKeys: string[];
}

export interface IProjectState extends AsanyProject {}

export interface IWorkspaceState {
  block: IBlockState;
  [key: string]: any;
}

export interface IPluginState {
  [key: string]: EditorPlugin;
}

export interface IAsanyState {
  save: (project: AsanyProject) => void;
  isReady: boolean;
  mode: AsanyProviderMode;
  ui: IUIState;
  project: IProjectState;
  workspace: IWorkspaceState;
  features: IFeatureState;
  plugins: IPluginState;
}

export { AsanyProject, IApplicationData, AsanyProjectType, IComponentData };
