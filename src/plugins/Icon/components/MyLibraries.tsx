import React from 'react';

function MyLibraries() {
  return (
    <div className="ie-libraries">
      <div className="libraries-header-section">
        <h1 className="libraries-header">图标库</h1>
        <div className="library-list-wrapper">
          <div
            data-libraryid="urn:aaid:sc:va7:bb9b4a33-ea27-4e87-82ae-131612565bce"
            className="library-container js-library-container"
            data-t="library-section"
          >
            <div
              className="library-image-wrapper js-library-image-wrapper for-lib-d4e38e6d-710a-4abf-845d-9b2a2124fc93 empty-library"
              data-t="library-hero-image"
            >
              <i className="empty-library-icon icon-creative-cloud-library large" data-t="library-cc-icon"></i>
            </div>

            <div className="lib-description clear-fix">
              <h1 className="library-name-header truncate">
                <a
                  href="/Library/urn:aaid:sc:va7:bb9b4a33-ea27-4e87-82ae-131612565bce"
                  data-t="library-name-header-link"
                >
                  My Library
                </a>
              </h1>
              <p
                className="clear-fix library-item-count-label js-lib-count-label-d4e38e6d-710a-4abf-845d-9b2a2124fc93"
                data-t="library-total-count-text"
              >
                0 items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLibraries;
