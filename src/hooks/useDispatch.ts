import { useContext } from 'react';
import { AsanyContext, IAsanyStoreContext } from '../AsanyContext';

export default function useDispatch<D>() {
  const store = useContext<IAsanyStoreContext<D>>(AsanyContext);
  return store.dispatch;
}
