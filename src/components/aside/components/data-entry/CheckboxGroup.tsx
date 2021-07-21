import { Checkbox } from 'antd';
import { registerComponent } from '@asany/library-manager';

export default registerComponent(
  {
    id: 'com.thuni.him.asany.properties.CheckboxGroup',
    name: '复选框组',
    library: 'AsanyEditor.Config',
  },
  Checkbox.Group
);
