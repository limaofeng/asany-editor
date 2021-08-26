import { useContext } from 'react';
import { AsanyContext, IAsanyStoreContext } from '../AsanyContext';
import { IActionType } from '../reducers/actions';

export default function useDispatch<D = IActionType>() {
  const store = useContext<IAsanyStoreContext<D>>(AsanyContext);
  return store.dispatch;
}
