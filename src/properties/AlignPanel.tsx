import React from 'react';

import Icon from '@asany/icons';
import styled from 'styled-components';

import IconButton from './IconButton';

const aligns = [
  { icon: 'AsanyEditor/AlignLeft', title: '左对齐' },
  { icon: 'AsanyEditor/AlignHorizontalCenters', title: '水平居中对齐' },
  { icon: 'AsanyEditor/AlignRight', title: '右对齐' },
  { icon: 'AsanyEditor/AlignTop', title: '顶部对齐' },
  { icon: 'AsanyEditor/AlignVerticalCenters', title: '垂直居中对齐' },
  { icon: 'AsanyEditor/AlignBottom', title: '底部对齐' },
];

const MoreOptions = styled.div``;

const AlignPanel = () => {
  return (
    <div className="design-rows align-panel">
      {aligns.map(({ icon, title }) => (
        <IconButton tooltip={title} key={icon} icon={icon} />
      ))}
      <MoreOptions className="more-options">
        <IconButton icon="AsanyEditor/VectorAlign" />
        <Icon className="more-arrow" name="AsanyEditor/ArrowBottom" />
      </MoreOptions>
      {/* TidyUp // DistributeVerticalSpacing // DistributeHorizontalSpacing 
      <div className="more-options icons-pane">
        <Icon name="VectorAlign" />
      </div>
      */}
    </div>
  );
};
export default AlignPanel;
