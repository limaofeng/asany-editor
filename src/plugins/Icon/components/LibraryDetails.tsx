import Icon from '@asany/icons';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react';
import { Link } from 'react-router-dom';

function LibraryDetails() {
  return (
    <div className="ie-libraries ie-library-details">
      <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        <div className="libraries-header-section">
          <h1 className="libraries-header">
            <Link to="/libraries">Libraries</Link> <Icon className="icon-arrow" name="nifty/admin-tools" />
            <span className="library-current">Default</span>
          </h1>
          <div className="subheading">
            <span className="library-detail-header-library-total-count-text">6 items</span>
          </div>
        </div>
        <div className="mosaic-container">
          <div className="icon-thumb-mosaic"></div>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default React.memo(LibraryDetails);
