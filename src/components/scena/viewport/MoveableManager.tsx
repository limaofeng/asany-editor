import React, { useCallback, useEffect, useRef } from 'react';

import Moveable from 'react-moveable';

import { useSelector } from '../../../hooks';

interface MoveableManagerProps {
  container?: HTMLElement | null;
}

function MoveableManager(props: MoveableManagerProps) {
  const ref = useRef<Moveable>(null);

  const { container } = props;

  const snaps = useSelector((state) => state.ui.scena.snaps);
  const moveableData = useSelector((state) => state.ui.scena.moveable.data);
  const selectedTargets = useSelector((state) => state.ui.scena.moveable.selectedTargets);

  const { vertical: verticalGuidelines, horizontal: horizontalGuidelines } = snaps;

  const handeWindowResize = useCallback(() => {
    ref.current && ref.current!.updateRect();
  }, [ref]);

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

  return (
    <Moveable
      ref={ref}
      container={container}
      targets={selectedTargets}
      elementGuidelines={elementGuidelines}
      verticalGuidelines={verticalGuidelines}
      horizontalGuidelines={horizontalGuidelines}
      origin={false}
    />
  );
}

export default MoveableManager;
