import React, { useCallback, useEffect, useRef } from 'react';

import Guides, { OnChangeGuides } from '@scena/react-guides';

export interface RulerGuides {
  horizontal: number[];
  vertical: number[];
}

interface RulerProps {
  zoom: number;
  rulable: boolean;
  scrollX: number;
  scrollY: number;
  offsetLeft?: number;
  onResetScroll: () => void;
  onGuides?: (data: RulerGuides) => void;
}

function Ruler(props: RulerProps) {
  const { zoom, scrollY = 0, scrollX = 0, onResetScroll, onGuides, offsetLeft: offsetleft } = props;

  const box = useRef<HTMLDivElement>(null);
  const horizontal = useRef<Guides>(null);
  const vertical = useRef<Guides>(null);
  const guides = useRef<RulerGuides>({ horizontal: [], vertical: [] });

  let unit = 50;

  if (zoom < 0.8) {
    unit = Math.floor(1 / zoom) * 50;
  }

  const handleWindowResize = useCallback(() => {
    horizontal.current!.resize();
    vertical.current!.resize();
  }, []);

  useEffect(() => {
    horizontal.current!.scroll(-scrollX / zoom);
    horizontal.current!.scrollGuides(-scrollY / zoom);
    vertical.current!.scroll(-scrollY / zoom);
    vertical.current!.scrollGuides(-scrollX / zoom);
  }, [scrollX, scrollY, zoom]);

  const handleChangeGuides = useCallback(
    (key: 'horizontal' | 'vertical') => (e: OnChangeGuides) => {
      guides.current[key] = e.guides;
      onGuides && onGuides(guides.current);
    },
    []
  );

  const handleRulerReset = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onResetScroll();
    },
    [onResetScroll]
  );

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <div className="ruler horizontal" onClick={handleClick}>
        <Guides
          ref={horizontal}
          type="horizontal"
          backgroundColor="#f2f3f5"
          textColor="#585858"
          lineColor="#b1b1b1"
          displayDragPos={true}
          zoom={zoom}
          unit={unit}
          rulerStyle={{
            left: '30px',
            width: 'calc(100% - 30px)',
            height: '100%',
          }}
          onChangeGuides={handleChangeGuides('horizontal')}
        />
      </div>
      <div className="ruler vertical" style={{ left: offsetleft }} onClick={handleClick}>
        <Guides
          ref={vertical}
          type="vertical"
          backgroundColor="#f2f3f5"
          textColor="#585858"
          lineColor="#b1b1b1"
          zoom={zoom}
          unit={unit}
          rulerStyle={{
            top: '30px',
            height: 'calc(100% - 30px)',
            width: '100%',
          }}
          displayDragPos={true}
          onChangeGuides={handleChangeGuides('vertical')}
        />
      </div>
      <div ref={box} className="box" style={{ left: offsetleft }} onClick={handleRulerReset} />
    </>
  );
}

export default React.memo(Ruler);
