import React from 'react';
import Icon from '../../../src/icon';

Icon.register('IconHand', function IconHand() {
  return (
    <span role="img" aria-label="layers" className="anticon layers">
      <svg height="16" width="16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0  18 18">
          <path d="M5,19h9c0,0,2.8-9,3.8-11.4c0.9-2.5-1.4-3-2.2-0.7c-0.6,1.7-1.1,1.9-1.1,1.9s-1,0-0.8-1 c0.2-1.3,0.5-3,0.9-5.4c0.3-1.5-2.2-1.8-2.4-0.5c-0.2,1.3-0.7,4.6-0.9,5.4c-0.1,0.8-1.1,1.4-1.2-0.5C10.1,5.5,10,3.7,10,1.2 c0-1.7-2.7-1.5-2.7,0.1c0,1.1,0.1,5.5,0.1,6.3c0,0.8-0.4,1.1-0.9-0.1c-0.6-1.3-1.2-2.8-1.7-4C3.9,1.7,1.8,2.9,2.3,4.2 c0.4,1.1,1.5,3.6,2.3,5.5c0.4,1,1,2.9-0.4,1.9c-0.9-0.7-1.3-1.4-2.4-2.1s-2.2,0.8-1.7,1.3c0.9,1.2,2.6,2.9,3.6,4.6 C4.5,16.7,5,19,5,19z" />
        </svg>
      </svg>
    </span>
  );
});

Icon.register('SelectFilled', function SelectFilled() {
  return (
    <span role="img" aria-label="select" className="anticon select-icon">
      <svg height="16" width="16">
        <path d="M0,0l6,18l2-9h8L0,0z" />
      </svg>
    </span>
  );
});

Icon.register('LayersFilled', function LayersFilled() {
  return (
    <span role="img" aria-label="layers" className="anticon layers">
      <svg height="16" width="16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M0 7.5l1.8-.9L8 10.1l6.2-3.6L16 7.5l-8 4.6L0 7.5zM0 4.2L8 0l8 4.2L8 8.8 0 4.2zM8 13.4l5.6-3.2 2.4 1.3L8 16l-8-4.6 2.4-1.3L8 13.4z" />
        </svg>
      </svg>
    </span>
  );
});

Icon.register('SketchFrame', function LayersFilled() {
  return (
    <span role="img" aria-label="frame" className="anticon frame">
      <svg
        className="svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 16v-3H0v-1h3V4H0V3h3V0h1v3h8V0h1v3h3v1h-3v8h3v1h-3v3h-1v-3H4v3H3zm9-4V4H4v8h8z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});

Icon.register('SketchImage', function LayersFilled() {
  return (
    <span role="img" aria-label="img" className="anticon img">
      <svg
        className="svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 10c1.38 0 2.5-1.12 2.5-2.5C15 6.12 13.88 5 12.5 5 11.12 5 10 6.12 10 7.5c0 1.38 1.12 2.5 2.5 2.5zM14 7.5c0 .828-.672 1.5-1.5 1.5-.828 0-1.5-.672-1.5-1.5 0-.828.672-1.5 1.5-1.5.828 0 1.5.672 1.5 1.5zM17 1H1v16h16V1zm-1 1v14h-1.293L6 7.293l-4 4V2h14zM2 16v-3.293l4-4L13.293 16H2z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});

// Icon.register('SketchImage', function LayersFilled() {
//   return (
//     <svg className="svg" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
//       <path
//         d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z"
//         fillRule="nonzero"
//         fillOpacity="1"
//         fill="#000"
//         stroke="none"
//       ></path>
//     </svg>
//   );
// });
