import React from 'react';

function Navigation() {
  return (
    <div className="ie-navigation">
      <div className="ie-search">
        <div className="ie-icon-typs">
          <select>
            <option>矢量图</option>
          </select>
        </div>
        <div className="ie-icon-input">
          <input />
        </div>
      </div>
      <div className="ie-my-libraries">
        <a>我的图标库</a>
      </div>
    </div>
  );
}

export default Navigation;
