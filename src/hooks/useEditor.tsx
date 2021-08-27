import AsanyEditor from '../api';
import { IAsanyEditor } from '../typings';

import useAsanyStore from './useAsanyStore';

export default function useEditor(): IAsanyEditor {
  const store = useAsanyStore();
  return new AsanyEditor(store);
}
