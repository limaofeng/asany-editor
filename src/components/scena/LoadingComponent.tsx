import classnames from 'classnames';
import React, { CSSProperties } from 'react';
import { CSSTransition } from 'react-transition-group';

import SpinKit from '../spinkit';

export interface LoadingComponentProps {
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
}

function LoadingComponent(props: LoadingComponentProps) {
  const { loading, className, style } = props;
  const handleAddEndListener = (node: HTMLElement, done: () => void) => {
    node.addEventListener('transitionend', done, false);
  };
  return (
    <CSSTransition in={loading} addEndListener={handleAddEndListener} classNames="asany-editor-loading">
      <div style={style} className={classnames('asany-editor-loading', className)}>
        <SpinKit name="Wave" />
      </div>
    </CSSTransition>
  );
}

export default React.memo(LoadingComponent);
