import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import classnames from 'classnames';

type ResizeFunc = (e: React.MouseEvent) => void;

export type ResizerProps = {
  className?: string;
  handleClassName?: string;
  direction?: 'x' | 'y';
  onResizeStart?: ResizeFunc;
  onResize: (diff: number) => void;
  onResizeEnd?: ResizeFunc;
  children: React.ReactNode;
  style?: CSSProperties;
};

function Resizer(props: ResizerProps) {
  const {
    className,
    handleClassName,
    direction = 'x',
    children,
    style,
  } = props;
  const { onResizeStart, onResize, onResizeEnd } = props;

  const [active, setActive] = useState(false);
  const state = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const position = state.current;
    let diff = 0;

    if (direction == 'x') {
      diff = position.x - e.clientX;
      diff && onResize(-diff);
    }

    if (direction == 'y') {
      diff = position.y - e.clientY;
      diff && onResize(diff);
    }

    updateStartPosition(e);
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    onResizeEnd && onResizeEnd(e);
    setActive(false);
    removeListeners();
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onResizeStart && onResizeStart(e);
    updateStartPosition(e);
    setActive(true);
    window.addEventListener('mouseup', handleMouseUp as any);
    window.addEventListener('mousemove', handleMouseMove as any);
  }, []);

  const updateStartPosition = useCallback((e: React.MouseEvent) => {
    state.current.x = e.clientX;
    state.current.y = e.clientY;
  }, []);

  const removeListeners = useCallback(() => {
    window.removeEventListener('mouseup', handleMouseUp as any);
    window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  useEffect(() => removeListeners, []);
  return (
    <div
      className={classnames('resizer', className, 'direction-' + direction, {
        active,
      })}
      style={style}
    >
      <div
        className={classnames('handle', handleClassName)}
        onMouseDown={handleMouseDown}
      ></div>
      {children}
    </div>
  );
}

export default React.memo(Resizer);
