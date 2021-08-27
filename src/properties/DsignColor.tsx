import React, { useState } from 'react';

import ScrubbableControl from './data-entry/ScrubbableControl';
import DsignIcons from './OptionButton';
import { inputFormat } from './utils';
interface DsignColorProp {}

const DsignColor = (_: DsignColorProp) => {
  const [colorStyle] = useState({
    backgroundColor: 'rgb(0, 0, 0)',
    opacity: 0.7,
  });
  const handleChange = () => () => {};
  const colorHandleChage = () => () => {};
  const iconHandleChange = () => () => {};
  return (
    <div className="design-colums design-color design-rows ">
      <div className="color-input">
        <div>
          <div
            onClick={colorHandleChage}
            className="color-chit"
            style={{ backgroundColor: colorStyle.backgroundColor }}
          >
            <div className="color-chit-alpha" style={{ opacity: colorStyle.opacity }} />
          </div>
        </div>
        <div className="color-value">
          <ScrubbableControl format={inputFormat} onChange={handleChange} value={0} />
        </div>
        <div className="color-percentage">
          <ScrubbableControl format={inputFormat} onChange={handleChange} value={0} />
        </div>
      </div>
      <DsignIcons
        style={{ gridColumn: '25/span 4' }}
        className="element-retract design-rows-items"
        onChange={iconHandleChange}
        icon="VectorEyes"
      />
      <DsignIcons
        style={{ gridColumn: '29/span 4' }}
        className="element-retract design-rows-items"
        onChange={iconHandleChange}
        icon="VectorSubtraction"
      />
    </div>
  );
};
export default DsignColor;
