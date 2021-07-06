---
category: Components
subtitle: 编辑器
type: 工具
title: AsanyEditor
cols: 1
---

当操作按钮比较多时，我们一般会采用下拉菜单。这里提供了一个不一样下拉菜单。当选择菜单时，只是切换按钮的操作，而不是立即触发

## 何时使用

精确控制菜单功能时

## API

### Tabs

| 参数          | 说明                                       | 类型                                  | 默认值 |
| ------------- | ------------------------------------------ | ------------------------------------- | ------ |
| actions       | 所有的操作                                 | Action[]                              | 无     |
| defaultAction | 是否使用动画切换 Tabs，在 `tabPosition=top | bottom` 时有效                        | string | 当不传时，默认取 actions[0] 作为默认值 |
| filter        | 筛选操作的过滤函数                         | filter(actions: Action[]) => Action[] | 无     |

### Action

| 参数    | 说明                      | 类型        | 默认值  |
| ------- | ------------------------- | ----------- | ------- |
| name    | 被隐藏时是否渲染 DOM 结构 | boolean     | false   |
| type    | 对应 activeKey            | ActionType  | menu    |
| color   | 选项卡头显示文字          | ActionColor | primary |
| onClick | 选项卡头显示文字          | () => void  | 无      |
