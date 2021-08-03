import Icon from '@asany/icons';
import React from 'react';

function Navigation() {
  return (
    <div className="ie-navigation">
      <div className="navigation-left">
        <Icon name="ToolbarBack" className="back-icon toolbar-icon" />
        <span className="title">ASANY </span>
      </div>
      <div className="ie-navigation-container">
        <div className="ie-search">
          <div className="ie-icon-typs">
            <select>
              <option>矢量图</option>
            </select>
          </div>
          <div className="ie-icon-input">
            <input placeholder="搜索图标" />
          </div>
        </div>
      </div>
      <div className="ie-my-libraries">
        <a className="button-text">我的图标库</a>
      </div>
    </div>
  );
}

export default Navigation;
