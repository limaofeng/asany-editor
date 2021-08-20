import classnames from 'classnames';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import IconButton from './IconButton';
import ScrubbableControl from './data-entry/ScrubbableControl';
import SegmentedControl from './data-entry/SegmentedControl';
import { inputFormat } from './utils';

const DsignAutoLayout = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  useClickAway(ref, () => {
    setVisible(false);
  });
  const handleAlignmentAndPaddingClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="design-rows design-colums content-col asanyeditor-auto-layout">
      <SegmentedControl
        options={[
          {
            value: 'VerticalDirection',
            icon: 'VectorArrowButtom',
            label: '垂直方向',
          },
          {
            value: 'HorizontalDirection',
            icon: 'VectorArrowRight',
            label: '水平方向',
          },
        ]}
      />
      <ScrubbableControl className="spacing-between-items" format={inputFormat} value={0} icon="VectorSpacing" />
      <ScrubbableControl className="padding-around-items" format={inputFormat} value={0} icon="VectorPadding" />
      <IconButton
        ref={ref}
        className={classnames('alignment-and-padding', { active: visible })}
        icon="AlignmentAndPadding"
        onClick={handleAlignmentAndPaddingClick}
      />
    </div>
  );
};
export default DsignAutoLayout;
