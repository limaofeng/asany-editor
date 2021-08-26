import React, { useRef, useCallback, useEffect } from 'react';
import Moveable from 'react-moveable';
import { useSelector } from '../../../hooks';
// import MoveableData from '../../../utils/MoveableData';
// import Memory from '../../../utils/Memory';
// interface MoveableManagerProps {
// selectedTargets: Array<HTMLElement | SVGElement>;
// selectedMenu: string;
// verticalGuidelines: number[];
// horizontalGuidelines: number[];
// }
// onResizeStop, ignoreTargets, onDragStop, verticalGuidelines, horizontalGuidelines;
interface MoveableManagerProps {
  container?: HTMLElement | null;
  // resizable?: boolean;
  // onResizeStart?: any;
  // onResize?: (resize: OnResize) => void;
  // onResizeStop?: any;
  // selectedTargets: HTMLElement[];
  // draggable?: boolean;
  // onDragStart?: (drag: OnDragStart) => void;
  // onDrag?: (drag: OnDrag) => void;
  // onDragStop?: (drag: OnDragEnd) => void;
  // onClickGroup?: (group: OnClickGroup) => void;
  // verticalGuidelines?: number[];
  // horizontalGuidelines?: number[];
}

function MoveableManager(props: MoveableManagerProps) {
  const ref = useRef<Moveable>(null);

  const {
    container,
    // selectedTargets,
    // draggable,
    // resizable,
    // verticalGuidelines,
    // horizontalGuidelines,
    // onDragStart,
    // onDrag,
    // onDragStop,
    // onResizeStart,
    // onResize,
    // onResizeStop,
    // onClickGroup,
  } = props;

  // const [, forceRender] = useReducer((s) => s + 1, 0);

  const snaps = useSelector((state) => state.ui.scena.snaps);
  const moveableData = useSelector((state) => state.ui.scena.moveable.data);
  const selectedTargets = useSelector((state) => state.ui.scena.moveable.selectedTargets);

  const { vertical: verticalGuidelines, horizontal: horizontalGuidelines } = snaps;

  // const draggable = undefined; // moveable.draggable;
  // const resizable = undefined; // moveable.resizable;
  // // const selectedTargets = moveable.selectedTargets;
  // const onResizeStart = moveable.onResizeStart;
  // const onResize = moveable.onResize;
  // const onResizeStop = undefined; // moveable.onResizeStop;
  // const onDragStart = moveable.onDragStart;
  // const onDrag = moveable.onDrag;
  // const onDragStop = undefined;
  // const onClickGroup = undefined;

  //   const [selectedTargets, setSelectedTargets] = useState<Array<HTMLElement | SVGElement>>([]);

  //   const { vertical: verticalGuidelines, horizontal: horizontalGuidelines } = snaps;

  // useEffect(() => {
  //   return moveable.on('state-change', () => {
  //     console.log('state-change??');
  //     setTimeout(forceRender, 5000);
  //     // forceRender();
  //   });
  // }, []);

  const handeWindowResize = useCallback(() => {
    ref.current && ref.current!.updateRect();
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', handeWindowResize);
    return () => {
      window.removeEventListener('resize', handeWindowResize);
    };
  }, []);

  // const [selectedTargets, setSelectedTargets] = useState<any>([]);

  // const selectedTargets = useMemo(() => Array.from(moveable.getTargets()), [moveable.getTargets()]);

  // console.log('selectedTargets', selectedTargets);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // setSelectedTargets(document.querySelectorAll('.block-provider'));
  //     // setSelectedTargets(document.querySelectorAll('.moveable-x'));
  //   }, 2000);
  // }, []);

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
      // // parentPosition={{
      // //   top: -80,
      // //   left: -80,
      // // }}
      // defaultGroupRotate={0}
      // defaultGroupOrigin={'50% 50%'}
      // draggable={true}
      // throttleDrag={0}
      // startDragRotate={0}
      // throttleDragRotate={0}
      // zoom={1}
      // origin={true}
      // // draggable={draggable}
      // resizable={resizable}
      // onClick={handleClick}
      // // throttleResize={1}
      // // clippable={selectedMenu === 'Crop'}
      // dragArea={false}
      // // checkInput={selectedMenu === 'Text'}
      // // throttleDragRotate={isShift ? 45 : 0}
      // // keepRatio={isShift}
      // rotatable={false}
      // snappable={true}
      // snapCenter={true}
      // snapGap={false}
      // roundable={true}

      // //   elementGuidelines={elementGuidelines}
      // // clipArea={true}
      // onDragStart={onDragStart}
      // onDrag={onDrag}
      // onDragEnd={onDragStop}
      // //   onDragGroupStart={moveableData.onDragGroupStart}
      // //   onDragGroup={moveableData.onDragGroup}
      // //   onScaleStart={moveableData.onScaleStart}
      // //   onScale={moveableData.onScale}
      // //   onScaleGroupStart={moveableData.onScaleGroupStart}
      // //   onScaleGroup={moveableData.onScaleGroup}
      // onResizeStart={onResizeStart}
      // onResize={onResize}
      // onResizeEnd={onResizeStop}
      // // onResizeGroupStart={moveableData.onResizeGroupStart}
      // //   onResizeGroup={moveableData.onResizeGroup}
      // //   onRotateStart={moveableData.onRotateStart}
      // //   onRotate={moveableData.onRotate}
      // //   onRotateGroupStart={moveableData.onRotateGroupStart}
      // //   onRotateGroup={moveableData.onRotateGroup}
      // //   defaultClipPath={memory.get('crop') || 'inset'}
      // //   onClip={moveableData.onClip}
      // //   onDragOriginStart={moveableData.onDragOriginStart}
      // //   onDragOrigin={e => {
      // //     moveableData.onDragOrigin(e);
      // //   }}
      // //   onRound={moveableData.onRound}
      // //   onClick={e => {
      // //     const target = e.inputTarget as any;
      // //     if (e.isDouble && target.isContentEditable) {
      // //       editor.selectMenu('Text');
      // //       const el = getContentElement(target);

      // //       if (el) {
      // //         el.focus();
      // //       }
      // //     }
      // //   }}
      // onClickGroup={onClickGroup}
      // // onRenderStart={e => {
      // //   e.datas.prevData = moveableData.getFrame(e.target).get();
      // // }}
      // // onRender={e => {
      // //   e.datas.isRender = true;
      // //   eventBus.requestTrigger('render');
      // // }}
      // // onRenderEnd={e => {
      // //   eventBus.requestTrigger('render');
      // //   if (!e.datas.isRender) {
      // //     return;
      // //   }
      // //   this.historyManager.addAction('render', {
      // //     id: getId(e.target),
      // //     prev: e.datas.prevData,
      // //     next: moveableData.getFrame(e.target).get(),
      // //   });
      // // }}
      // // onRenderGroupStart={e => {
      // //   e.datas.prevDatas = e.targets.map(target => moveableData.getFrame(target).get());
      // // }}
      // // onRenderGroup={e => {
      // //   eventBus.requestTrigger('renderGroup', e);
      // //   e.datas.isRender = true;
      // // }}
      // //   onRenderGroupEnd={e => {
      // //     eventBus.requestTrigger('renderGroup', e);

      // //     if (!e.datas.isRender) {
      // //       return;
      // //     }
      // //     const prevDatas = e.datas.prevDatas;
      // //     const infos = e.targets.map((target, i) => {
      // //       return {
      // //         id: getId(target),
      // //         prev: prevDatas[i],
      // //         next: moveableData.getFrame(target).get(),
      // //       };
      // //     });
      // //     this.historyManager.addAction('renders', {
      // //       infos,
      // //     });
      // //   }}
    ></Moveable>
  );
}

export default MoveableManager;
