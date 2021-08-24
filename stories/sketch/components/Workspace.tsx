import React from 'react';
import { component, library, useReactComponent, useSunmao } from 'sunmao';

function Workspace() {
  const x = useSunmao();
  const component = useReactComponent('cn.asany.ui.sunmao.test.Showme');
  return React.createElement(component);
}

export default Workspace;
