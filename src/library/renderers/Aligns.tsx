import React from 'react';
import classnames from 'classnames';
const TYPES = ['vertical', 'horizontal'] as const;
const DIRECTIONS = ['start', 'center', 'end'] as const;

interface AlignProps {
  type: 'horizontal' | 'vertical';
  direction: 'start' | 'center' | 'end';
  onClick: (type: 'horizontal' | 'vertical', direction: 'start' | 'center' | 'end') => any;
}

function Align(props: AlignProps) {
  const { type, direction, onClick } = props;

  const handleClick = () => {
    onClick(type, direction);
  };

  return (
    <div className={classnames('scena-align', `scena-align-${type}`, `scena-align-${direction}`)} onClick={handleClick}>
      <div className="scena-align-line"></div>
      <div className="scena-align-element1"></div>
      <div className="scena-align-element2"></div>
    </div>
  );
}

function Aligns() {
  const handleClick = () => {};

  return (
    <>
      {TYPES.map((type) => {
        return DIRECTIONS.map((direction) => {
          return <Align key={`${type}-${direction}`} type={type} direction={direction} onClick={handleClick} />;
        });
      })}
    </>
  );
}

export default Aligns;
