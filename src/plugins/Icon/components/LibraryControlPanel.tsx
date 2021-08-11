import React, { memo, useMemo } from 'react';
import { ComponentPropertyType } from '../../../typings';
import { createDynaActionForm } from '../../../utils/BlockAside';

function LibraryControlPanel() {
  const DynaActionForm = useMemo(
    () =>
      createDynaActionForm({
        fields: [
          {
            name: 'name',
            type: ComponentPropertyType.String,
            placeholder: 'Untitled Name',
          },
          {
            name: 'unicode',
            type: ComponentPropertyType.String,
            placeholder: 'Untitled Unicode',
          },
        ],
      }),
    []
  );

  return (
    <div className="sketch-configuration-body scrollbars-visible">
      <DynaActionForm />
    </div>
  );
}

export default memo(LibraryControlPanel);
