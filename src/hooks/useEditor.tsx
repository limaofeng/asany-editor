import AsanyEditor from '../api';
import useAsanyStore from './useAsanyStore';
import { IAsanyEditor } from '../typings';

export default function useEditor(): IAsanyEditor {
  const store = useAsanyStore();
  return new AsanyEditor(store);
}
