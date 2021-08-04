import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react';

function LibraryDetails() {
  return (
    <div className="ie-library-details">
      <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        <div className="libraries-header-section">
          <h1 className="libraries-header">图标库</h1>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default React.memo(LibraryDetails);
