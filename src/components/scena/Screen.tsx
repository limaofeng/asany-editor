import React, { useEffect, useRef } from 'react';

import classnames from 'classnames';
import { useDragDropManager, useDrop } from 'react-dnd';

import { useSelector } from '../../hooks';

import MoveableManager from './viewport/MoveableManager';

interface ScreenProps {
  children?: React.ReactNode;
}

function Screen({ children }: ScreenProps) {
  const artboard = useRef<HTMLDivElement>(null);
  const screenHeader = useRef<HTMLDivElement>(null);
  const moveableContainer = useRef<HTMLDivElement>(null);

  const zoom = useSelector((state) => state.ui.scena.zoom);
  const [width, height] = useSelector((state) => state.ui.scena.screen.size);
  const dustbin = useSelector((state) => state.ui.scena.viewer.dustbin);

  const manager = useDragDropManager();

  const [{ handlerId }, connectDrop] = useDrop({
    accept: 'dustbin',
    canDrop() {
      return false;
    },
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
  });

  connectDrop(artboard);

  useEffect(() => {
    if (!handlerId) {
      return;
    }
    const registry: any = manager.getRegistry();
    registry.types.set(handlerId, dustbin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerId, dustbin]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [width, height]);

  const style = { width, height };
  return (
    <>
      <div
        className="screen"
        style={{
          left: `${(100 - zoom * 100) / 2}%`,
          top: `${(100 - zoom * 100) / 2}%`,
          width: `${zoom * 100}%`,
          height: `${zoom * 100}%`,
        }}
      >
        <div
          ref={screenHeader}
          className={classnames('screen-info', {
            'is-active': true,
          })}
        >
          <span>组件名</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon icon attribute-setting"
            viewBox="0 0 14 14"
            aria-hidden="true"
          >
            <path d="M7.512.295l5.039 2.91c.316.182.511.52.511.886v5.818c0 .366-.195.704-.511.886l-5.04 2.91a1.023 1.023 0 0 1-1.023 0l-5.039-2.91a1.023 1.023 0 0 1-.511-.886V4.091c0-.366.195-.704.511-.886L6.49.295a1.023 1.023 0 0 1 1.023 0zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          </svg>
        </div>
        <div className="canvas-bg-area" />
      </div>
      <div className={classnames('zoom-area')} ref={moveableContainer} style={{ transform: `scale(${zoom})` }}>
        <div className="canvas" style={style}>
          {children}
        </div>
        <MoveableManager container={moveableContainer.current} />
      </div>
    </>
  );
}

export default React.memo(Screen);
