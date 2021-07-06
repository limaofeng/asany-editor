import React, { useRef } from 'react';
import Selecto from 'react-selecto';

function SelectoMananger() {
  const selecto = useRef<Selecto>(null);
  return (
    <Selecto
      ref={selecto}
      dragContainer={'.infinite-Viewer'}
      hitRate={0}
      selectableTargets={['[data-scena-element]']}
      selectByClick={true}
      selectFromInside={false}
      toggleContinueSelect={['shift']}
      preventDefault={true}
      // scrollOptions={
      //     infiniteViewer.current ? {
      //         container: infiniteViewer.current.getContainer(),
      //         threshold: 30,
      //         throttleTime: 30,
      //         getScrollPosition: () => {
      //             const current = infiniteViewer.current!;
      //             return [
      //                 current.getScrollLeft(),
      //                 current.getScrollTop(),
      //             ];
      //         },
      //     } : undefined
      // }
      // onDragStart={e => {
      //     const inputEvent = e.inputEvent;
      //     const target = inputEvent.target;

      //     this.checkBlur();
      //     if (selectedMenu === "Text" && target.isContentEditable) {
      //         const contentElement = getContentElement(target);

      //         if (contentElement && contentElement.hasAttribute("data-scena-element")) {
      //             e.stop();
      //             this.setSelectedTargets([contentElement]);
      //         }
      //     }
      //     if (
      //         (inputEvent.type === "touchstart" && e.isTrusted)
      //         || moveableManager.current!.getMoveable().isMoveableElement(target)
      //         || state.selectedTargets.some(t => t === target || t.contains(target))
      //     ) {
      //         e.stop();
      //     }
      // }}
      // onScroll={({ direction }) => {
      //     infiniteViewer.current!.scrollBy(direction[0] * 10, direction[1] * 10);
      // }}
      // onSelectEnd={({ isDragStart, selected, inputEvent, rect }) => {
      //     if (isDragStart) {
      //         inputEvent.preventDefault();
      //     }
      //     if (this.selectEndMaker(rect)) {
      //         return;
      //     }
      //     this.setSelectedTargets(selected).then(() => {
      //         if (!isDragStart) {
      //             return;
      //         }
      //         moveableManager.current!.getMoveable().dragStart(inputEvent);
      //     });
      // }}
    />
  );
}

export default SelectoMananger;
