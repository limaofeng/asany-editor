import { Switch } from 'antd';
import { connect } from '../../../../library/LibraryManager';

export default connect(
  {
    id: 'com.thuni.him.asany.properties.Switch',
    name: '开关',
    library: 'AsanyEditor.Config',
  },
  Switch
);
