import React from 'react';

interface AsidePanelProps {
  children: React.ReactNode;
}

function AsidePanel(props: AsidePanelProps) {
  return (
    <div className="sketch-configuration-body scrollbars-visible">
      {props.children}
    </div>
  );
}

export default React.memo(AsidePanel);
