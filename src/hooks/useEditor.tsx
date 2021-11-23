import { useMemo } from 'react';

import AsanyEditor from '../api';
import { IAsanyEditor } from '../typings';

import useAsanyStore from './useAsanyStore';

export default function useEditor(): IAsanyEditor {
  const store = useAsanyStore();
  return useMemo(() => new AsanyEditor(store), [store]);
}
