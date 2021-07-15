import classnames from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDragDropManager, useDrop } from 'react-dnd';

// import ThumbnailGenerator from '../../../thumbnail';
// import { IThumbnailGenerator } from '../../../thumbnail/ThumbnailGenerator';
import { useSelector } from '../../hooks';
import useBlock from '../../hooks/useBlock';
import { father } from '../../typings';
import MoveableManager from './viewport/MoveableManager';

interface ScreenProps {
  children?: JSX.Element;
}

function Screen({ children }: ScreenProps) {
  // const thumbnail = useRef<IThumbnailGenerator>(null);
  const artboard = useRef<HTMLDivElement>(null);
  const screenHeader = useRef<HTMLDivElement>(null);
  const moveableContainer = useRef<HTMLDivElement>(null);

  const root = useSelector((state) =>
    state.workspace.block.blocks.find(
      (item) => item.key.startsWith('root/') && item.key.split('/').length == 2
    )
  );
  const disabled = useSelector(
    (state) => state.mode === 'VIEW' || !state.features.block
  );
  const isZoom = useSelector((state) => state.features.zoom);
  const zoom = useSelector((state) => state.ui.scena.zoom);
  const [width, height] = useSelector((state) => state.ui.scena.screen.size);
  const activeKey = useSelector((state) => state.workspace.block.activeKey);
  const project = useSelector((state) => state.project);
  const snaps = useSelector((state) => state.ui.scena.snaps);
  const moveable = useSelector((state) => state.ui.scena.moveable);
  const dustbin = useSelector((state) => state.ui.scena.viewer.dustbin);

  useSelector((state) => state.ui.scena.moveable.enable);

  const {
    vertical: verticalGuidelines,
    horizontal: horizontalGuidelines,
  } = snaps;

  // const lastKey = useSelector(
  //   ({
  //     workspace: {
  //       block: { stack },
  //     },
  //   }) => stack[stack.length - 1]
  // );

  // const data = useSelector(
  //   ({ workspace: { blocks } }) =>
  //     blocks.filter(({ key }) => !['root'].includes(key)).map(({ key, props }) => ({ key, props })),
  //   isEqual
  // );

  // useDeepCompareEffect(() => {
  //   if (!data.length) {
  //     return;
  //   }
  // }, [data]);

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
  }, [handlerId, dustbin]);

  const [{ Provider }, block] = useBlock({
    key: father,
    title: '主模块',
    icon: '',
    customizer: { fields: [] },
  });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      e.stopPropagation();
      (root as any).click();
    },
    [disabled, root]
  );

  const lastKey = useSelector(
    ({
      workspace: {
        block: { stack },
      },
    }) => stack[stack.length - 1]
  );

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [width, height]);

  const style = (isZoom && { width, height }) || { height: '100%' };
  // <ThumbnailGenerator ref={thumbnail}></ThumbnailGenerator>
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
        {root?.title && (
          <div
            ref={screenHeader}
            onClick={handleClick}
            className={classnames('screen-info', {
              'is-active': activeKey === root?.key,
            })}
          >
            <span>{root?.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon icon attribute-setting"
              viewBox="0 0 14 14"
              aria-hidden="true"
            >
              <path d="M7.512.295l5.039 2.91c.316.182.511.52.511.886v5.818c0 .366-.195.704-.511.886l-5.04 2.91a1.023 1.023 0 0 1-1.023 0l-5.039-2.91a1.023 1.023 0 0 1-.511-.886V4.091c0-.366.195-.704.511-.886L6.49.295a1.023 1.023 0 0 1 1.023 0zM7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
          </div>
        )}
        <div className="canvas-bg-area" />
      </div>
      <div
        className="zoom-area"
        ref={moveableContainer}
        style={{ transform: `scale(${zoom})` }}
      >
        <div ref={block(artboard)} className="canvas" style={style}>
          <Provider deps={[project?.data?.id, children?.type?.info?.id]}>
            {children}
          </Provider>
        </div>
        {!disabled && (
          <>
            <MoveableManager
              container={moveableContainer.current}
              draggable={moveable.draggable}
              resizable={moveable.resizable}
              selectedTargets={moveable.selectedTargets}
              verticalGuidelines={verticalGuidelines}
              horizontalGuidelines={horizontalGuidelines}
              onResizeStart={moveable.onResizeStart}
              onResize={moveable.onResize}
              onResizeStop={moveable.onResizeStop}
              onDragStart={moveable.onDragStart}
              onDrag={moveable.onDrag}
            />
            <MoveableManager
              container={moveableContainer.current}
              selectedTargets={moveable
                .getHTMLElements([lastKey])
                .filter((item) => !moveable.selectedTargets.includes(item))}
              verticalGuidelines={verticalGuidelines}
              horizontalGuidelines={horizontalGuidelines}
            />
          </>
        )}
      </div>
    </>
  );
}

export default React.memo(Screen);
