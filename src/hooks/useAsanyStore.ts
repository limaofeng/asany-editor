import { useContext } from 'react';

import { AsanyContext, IAsanyStoreContext } from '../AsanyContext';

export default function useAsanyStore(): IAsanyStoreContext<any> {
  return useContext<IAsanyStoreContext<any>>(AsanyContext);
}
