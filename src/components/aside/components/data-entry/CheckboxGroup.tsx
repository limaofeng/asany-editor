import { Checkbox } from 'antd';
import { connect } from '../../../../library/LibraryManager';
export default connect(
  {
    id: 'com.thuni.him.asany.properties.CheckboxGroup',
    name: '复选框组',
    library: 'AsanyEditor.Config',
  },
  Checkbox.Group
);
