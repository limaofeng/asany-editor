import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import Moveable, { OnResize, OnResizeEnd, OnResizeStart } from 'react-moveable';

import { useDispatch, useSelector } from '../../../hooks';
import { ActionType } from '../../../reducers/actions';

interface MoveableManagerProps {
  container?: HTMLElement | null;
}

function MoveableManager(props: MoveableManagerProps) {
  const ref = useRef<Moveable>(null);

  const { container } = props;

  const dispatch = useDispatch();
  const snaps = useSelector((state) => state.ui.scena.snaps);
  const moveableData = useSelector((state) => state.ui.scena.moveable.data);
  const selectedTargets = useSelector((state) => state.ui.scena.moveable.selectedTargets);

  const { vertical: verticalGuidelines, horizontal: horizontalGuidelines } = snaps;

  const handeWindowResize = useCallback(() => {
    ref.current && ref.current!.updateRect();
  }, [ref]);

  useEffect(() => {
    dispatch({ type: ActionType.MoveableRef, payload: ref.current });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', handeWindowResize);
    return () => {
      window.removeEventListener('resize', handeWindowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elementGuidelines = Array.from(moveableData.getTargets()).filter((el) => {
    return selectedTargets.indexOf(el) === -1;
  });

  const draggable = useMemo(() => {
    return selectedTargets.length === 1 && !!selectedTargets[0].dataset['draggable'];
  }, [selectedTargets]);

  const resizable = useMemo(() => {
    return selectedTargets.length === 1 && !!selectedTargets[0].dataset['resizable'];
  }, [selectedTargets]);

  const handleResizeStart = useCallback(
    (e: OnResizeStart) => {
      moveableData.onResizeStart(e);
      const event = new CustomEvent<OnResizeStart>('moveable.resizeStart', { detail: e });
      e.target.dispatchEvent(event);
    },
    [moveableData]
  );

  const handleResize = useCallback(
    (e: OnResize) => {
      moveableData.onResize(e);
      const event = new CustomEvent<OnResize>('moveable.resize', { detail: e });
      e.target.dispatchEvent(event);
    },
    [moveableData]
  );

  const handleResizeStop = useCallback((e: OnResizeEnd) => {
    const event = new CustomEvent<OnResizeEnd>('moveable.resizeStop', { detail: e });
    e.target.dispatchEvent(event);
  }, []);

  return (
    <Moveable
      ref={ref}
      container={container}
      targets={selectedTargets}
      elementGuidelines={elementGuidelines}
      verticalGuidelines={verticalGuidelines}
      horizontalGuidelines={horizontalGuidelines}
      origin={false}
      draggable={draggable}
      resizable={resizable}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeEnd={handleResizeStop}
      onDragStart={moveableData.onDragStart}
      onDrag={moveableData.onDrag}
    />
  );
}

export default MoveableManager;
