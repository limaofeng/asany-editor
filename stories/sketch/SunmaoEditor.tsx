import React from 'react';
import { useMemo } from 'react';
import { SketchProvider } from 'sunmao';

import SketchPlugin from './index';
import AsanyEditor from '../../src';
import { useDeepCompareMemo } from '../../src/utils';
import { SunmaoEditorProps, SunmaoProject } from './typings';


function SunmaoEditor(props: SunmaoEditorProps) {
  const { id, name, data } = props;

  const project = useDeepCompareMemo<SunmaoProject>(() => ({ id, name, data, type: 'component' }), [id, name, data]);

  return (
    <SketchProvider>
      <AsanyEditor
        plugins={[SketchPlugin]}
        onSave={(data) => console.log(data)}
        className="icon-editor"
        project={project}
      />
    </SketchProvider>
  );
}

export default SunmaoEditor;
