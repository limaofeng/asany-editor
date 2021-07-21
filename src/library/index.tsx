import { cloneDeepWith } from 'lodash';

import LibraryManager from '@asany/library-manager';

export * from './typings';
export { default as ConfigurationPanel } from './ConfigurationPanel';

export function getDefaultProps(props: any[]) {
  return {
    ...(props || []).reduce((x: any, item: any) => {
      x[item.name] = cloneDeepWith(item.defaultValue);
      return x;
    }, {}),
  };
}

export default LibraryManager;
