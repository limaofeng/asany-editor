import { Checkbox, Radio, Switch } from 'antd';
import { component, library } from 'sunmao';

import { Input, InputNumber, Select, TextArea } from './properties/data-entry';

@library({ name: 'AsanyEditor', namespace: 'cn.asany.ui.editor.properties' })
class EditorLibrary {
  @component({})
  Input = Input;

  @component({})
  Checkbox = Checkbox;

  @component({})
  CheckboxGroup = Checkbox.Group;

  @component({})
  RadioGroup = Radio.Group;

  @component({})
  InputNumber = InputNumber;

  @component({})
  Select = Select;

  @component({})
  Switch = Switch;

  @component({})
  TextArea = TextArea;
}

const editor: any = new EditorLibrary();

export default [editor];
