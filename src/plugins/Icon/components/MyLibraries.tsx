import React from 'react';
import { Input } from 'antd';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import 'overlayscrollbars/css/OverlayScrollbars.css';

function MyLibraries() {
  return (
    <div className="ie-libraries">
      <OverlayScrollbarsComponent className="libraries-scrollbar" options={{ scrollbars: { autoHide: 'scroll' } }}>
        <div className="libraries-header-section">
          <h1 className="libraries-header">图标库</h1>
          <div className="library-list-wrapper">
            <div className="library-container library-create">
              <div className="library-create-form">
                <Input className="library-name-input ant-input-rimless" placeholder="图标库名称" />
              </div>
            </div>
            <div className="library-container">
              <div className="library-image-wrapper empty-library">
                <i className="empty-library-icon icon-creative-cloud-library large"></i>
              </div>
              <div className="lib-description clear-fix">
                <h1 className="library-name-header truncate">
                  <a>My Library</a>
                </h1>
                <p className="library-item-count-label">0 items</p>
              </div>
            </div>
            <div className="library-container">
              <div className="library-image-wrapper empty-library">
                <i className="empty-library-icon icon-creative-cloud-library large"></i>
              </div>
              <div className="lib-description clear-fix">
                <h1 className="library-name-header truncate">
                  <a>My Library</a>
                </h1>
                <p className="library-item-count-label">0 items</p>
              </div>
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}

export default MyLibraries;
