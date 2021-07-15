import classnames from 'classnames';
import React from 'react';

import Icon, { IconProps } from './icon';

Icon.register('Cross', function Cross() {
  return (
    <span role="img" aria-label="cross" className="anticon cross">
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="cross"
        viewBox="0 0 8 8"
        width="1em"
        height="1em"
      >
        <path d="M 8 6.77 C 8 6.77 6.77 8 6.77 8 C 6.77 8 4 5.23 4 5.23 C 4 5.23 1.23 8 1.23 8 C 1.23 8 0 6.77 0 6.77 C 0 6.77 2.77 4 2.77 4 C 2.77 4 0 1.23 0 1.23 C 0 1.23 1.23 0 1.23 0 C 1.23 0 4 2.77 4 2.77 C 4 2.77 6.77 0 6.77 0 C 6.77 0 8 1.23 8 1.23 C 8 1.23 5.23 4 5.23 4 C 5.23 4 8 6.77 8 6.77 Z" />
      </svg>
    </span>
  );
});

Icon.register('FieldsetExpand', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        viewBox="0 0 12 12"
        focusable="false"
        width="1em"
        height="1em"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.525 5.50785V0.482849H6.475V5.50785H11.5V6.45785H6.475V11.4828H5.525V6.45785H0.5V5.50785H5.525Z"
        />
      </svg>
    </span>
  );
});

Icon.register('FieldsetCollapsed', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        viewBox="0 0 12 6"
        width="1em"
        height="1em"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.5 3.5H0.5V2.5H11.5V3.5Z" fill="#333333" />
      </svg>
    </span>
  );
});

Icon.register('ArrowBottom', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.64453 4.354L0.644531 1.354L1.35253 0.645996L3.99853 3.293L6.64453 0.645996L7.35253 1.354L4.35253 4.354L3.99853 4.707L3.64453 4.354Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});

Icon.register('VectorAlign', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 13.5V0.5H0V13.5H1ZM12 0.5V13.5H11V0.5H12ZM7 3.5V10.5H5V3.5H7Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});

Icon.register('AlignBottom', function AlignBottom() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 0V10H3.5V0H5.5ZM13.5 12V13H0.5V12H13.5ZM10.5 10V4H8.5V10H10.5Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});

Icon.register('AlignHorizontalCenters', function AlignHorizontalCenters() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 0.5H5.5V3.5H0.5V5.5H5.5V8.5H2.5V10.5H5.5V13.5H6.5V10.5H9.5V8.5H6.5V5.5H11.5V3.5H6.5V0.5Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});

Icon.register('AlignLeft', function AlignLeft() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 13.5H0V0.5H1V13.5ZM13 5.5H3V3.5H13V5.5ZM3 10.5H9V8.5H3V10.5Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});

Icon.register('AlignVerticalCenters', function AlignVerticalCenters() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 5.5V0.5H5.5V5.5H8.5V2.5H10.5V5.5H13.5V6.5H10.5V9.5H8.5V6.5H5.5V11.5H3.5V6.5H0.5V5.5H3.5Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});
Icon.register('ConstrainProportionsOff', function ConstrainProportionsOff() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 6 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5V3c0-1.105-.895-2-2-2-1.105 0-2 .895-2 2v2H0V3c0-1.657 1.343-3 3-3 1.657 0 3 1.343 3 3v2H5zm1 4H5v2c0 1.105-.895 2-2 2-1.105 0-2-.895-2-2V9H0v2c0 1.657 1.343 3 3 3 1.657 0 3-1.343 3-3V9z"
          fillRule="evenodd"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('ConstrainProportionsOn', function ConstrainProportionsOn() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 6 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 1c1.105 0 2 .895 2 2v2h1V3c0-1.657-1.343-3-3-3-1.657 0-3 1.343-3 3v2h1V3c0-1.105.895-2 2-2zm2 8h1v2c0 1.657-1.343 3-3 3-1.657 0-3-1.343-3-3V9h1v2c0 1.105.895 2 2 2 1.105 0 2-.895 2-2V9zM2.5 4v6h1V4h-1z"
          fillRule="evenodd"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('TopLeftCornerRadius', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4.5C0 2.015 2.015 0 4.5 0H8v1H4.5C2.567 1 1 2.567 1 4.5V8H0V4.5z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        />
      </svg>
    </span>
  );
});
Icon.register('TopRightCornerRadius', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4.5C8 2.015 5.985 0 3.5 0H0v1h3.5C5.433 1 7 2.567 7 4.5V8h1V4.5z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('BottomRightCornerRadius', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.5C8 5.985 5.985 8 3.5 8H0V7h3.5C5.433 7 7 5.433 7 3.5V0h1v3.5z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('BottomLeftCornerRadius', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3.5C0 5.985 2.015 8 4.5 8H8V7H4.5C2.567 7 1 5.433 1 3.5V0H0v3.5z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('Landscape', function Landscape() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 14 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1v6h12V1H1zM0 7v1h14V0H0v7z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('VectorRetract', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.644531 1.35058L4.29153 4.99658H1.99853V5.99658H5.99853V1.99658H4.99853V4.28958L1.35253 0.642578L0.644531 1.35058ZM11.7055 4.99658L15.3525 1.35058L14.6455 0.642578L10.9985 4.28958V1.99658H9.99853V5.99658H13.9985V4.99658H11.7055ZM11.7055 10.9966L15.3525 14.6426L14.6455 15.3506L10.9985 11.7036V13.9966H9.99853V9.99658H13.9985V10.9966H11.7055ZM4.29153 10.9966L0.644531 14.6426L1.35253 15.3506L4.99853 11.7036V13.9966H5.99853V9.99658H1.99853V10.9966H4.29153Z" />
      </svg>
    </span>
  );
});
Icon.register('AlignRight', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 13.5H13V0.5H12V13.5ZM0 5.5H10V3.5H0V5.5ZM10 10.5H4V8.5H10V10.5Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});
Icon.register('VectorRotate', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="8"
        height="9"
        viewBox="0 0 8 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0.996582V8.99658H8V7.99658H5C5 5.78658 3.21 3.99658 1 3.99658V0.996582H0ZM1 4.99658V7.99658H4C4 6.33958 2.657 4.99658 1 4.99658Z"
          fill="#B3B3B3"
        />
      </svg>
    </span>
  );
});
Icon.register('VectorSemicircle', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0.996582H3V1.99658H1V3.99658H0V0.996582ZM7 0.996582H10V3.99658H9V1.99658H7V0.996582ZM1 9.99658V7.99658H0V10.9966H3V9.99658H1ZM10 7.99658V10.9966H7V9.99658H9V7.99658H10Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});
Icon.register('AlignTop', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 1V0H0.5V1H13.5ZM5.5 13V3H3.5V13H5.5ZM10.5 3V9H8.5V3H10.5Z"
          fill="#333333"
        />
      </svg>
    </span>
  );
});
Icon.register('Portrait', function Portrait() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1H1v12h6V1zM1 0H0v14h8V0H1z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});

Icon.register('VectorCorrect', function IconHand() {
  return (
    <svg
      className="anticon fieldset-expand"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.207 5.207L7 11.414 3.292 7.707l1.415-1.414L7 8.586l4.793-4.793 1.414 1.414z"
        fillRule="nonzero"
        fillOpacity="1"
        fill="#fff"
        stroke="none"
      ></path>
    </svg>
  );
});
Icon.register('VectorArrowButtom', function IconHand() {
  return (
    <svg
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.707 3.49316L7.354 0.13916L6.646 0.84716L8.793 2.99316H0.5V3.99316H8.793L6.646 6.13916L7.354 6.84716L10.707 3.49316Z"
        fill="#333333"
      />
    </svg>
  );
});
Icon.register('VectorArrowRight', function IconHand() {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 11.2002L0.645996 7.84716L1.354 7.13916L3.5 9.28616V0.993164H4.5V9.28616L6.646 7.13916L7.354 7.84716L4 11.2002Z"
        fill="#333333"
      />
    </svg>
  );
});
Icon.register('AlignmentAndPadding', function AlignmentAndPadding() {
  return (
    <span
      role="img"
      aria-label="Alignment and padding"
      className="anticon alignment-and-padding"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3v1h6V3H3zm0 2.5v1h8v-1H3zM3 8v1h4V8H3z"
          fillRule="nonzero"
          fillOpacity="1"
          stroke="none"
        ></path>
        <path
          d="M14 1H2c-.552 0-1 .448-1 1v12c0 .552.448 1 1 1h12c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1zM2 0C.895 0 0 .895 0 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V2c0-1.105-.895-2-2-2H2z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('ResizeToFit', function ResizeToFit() {
  return (
    <span
      role="img"
      aria-label="Resize to fit"
      className="anticon resize-to-fit"
    >
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.646 1.354L4.293 5H2v1h4V2H5v2.293L1.354.646l-.708.708zM11.707 5l3.647-3.646-.707-.708L11 4.293V2h-1v4h4V5h-2.293zm0 6l3.647 3.646-.707.708L11 11.707V14h-1v-4h4v1h-2.293zm-7.414 0L.646 14.646l.708.708L5 11.707V14h1v-4H2v1h2.293z"
          fillRule="nonzero"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('VectorSpacing', function IconHand() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 13.9932V11.9932H1V13.9932H0V10.9932H12V13.9932H11ZM12 3.99316H0V0.993164H1V2.99316H11V0.993164H12V3.99316ZM9 7.99316V6.99316H3V7.99316H9Z"
        fill="#B3B3B3"
      />
    </svg>
  );
});
Icon.register('VectorPadding', function IconHand() {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3.99316H9V9.99316H3V3.99316ZM4 4.99316H8V8.99316H4V4.99316ZM0 0.993164H12V12.9932H0V0.993164ZM1 1.99316H11V11.9932H1V1.99316Z"
        fill="#B3B3B3"
      />
    </svg>
  );
});
Icon.register('VectorRadiusLT', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.39844 1.99658H5.39844C3.18844 1.99658 1.39844 3.78658 1.39844 5.99658V9.99658H0.398438V5.99658C0.398438 3.23558 2.63744 0.996582 5.39844 0.996582H9.39844V1.99658Z"
          fill="#B3B3B3"
        />
      </svg>
    </span>
  );
});
Icon.register('VectorRadiusRT', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4.5C8 2.015 5.985 0 3.5 0H0v1h3.5C5.433 1 7 2.567 7 4.5V8h1V4.5z"
          fillRule="evenodd"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('VectorRadiusLB', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3.5C0 5.985 2.015 8 4.5 8H8V7H4.5C2.567 7 1 5.433 1 3.5V0H0v3.5z"
          fillRule="evenodd"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('VectorRadiusRB', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        className="svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.5C8 5.985 5.985 8 3.5 8H0V7h3.5C5.433 7 7 5.433 7 3.5V0h1v3.5z"
          fillRule="evenodd"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('VectorSubtraction', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        className="svg"
        width="12"
        height="6"
        viewBox="0 0 12 6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 3.5H.5v-1h11v1z"
          fillRule="nonzero"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('VectorEyes', function IconHand() {
  return (
    <span
      role="img"
      aria-label="fieldset-expand"
      className="anticon fieldset-expand"
    >
      <svg
        className="svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2-1.104 0-2 .895-2 2 0 1.105.896 2 2 2z"
          fillRule="nonzero"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
        <path
          d="M8 4c2.878 0 5.378 1.621 6.635 4-1.257 2.379-3.757 4-6.635 4-2.878 0-5.377-1.621-6.635-4C2.623 5.621 5.122 4 8 4zm0 7c-2.3 0-4.322-1.194-5.478-3C3.678 6.194 5.7 5 8 5c2.3 0 4.322 1.194 5.479 3C12.322 9.806 10.3 11 8 11z"
          fillRule="evenodd"
          fillOpacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});

Icon.register(
  'ComponentInstance',
  function ComponentInstance(props: IconProps) {
    const { className } = props;
    return (
      <span
        role="img"
        aria-label="component-instance"
        className={classnames('anticon component-instance', className)}
      >
        <svg
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.828 7L7 .828 13.172 7 7 13.172.828 7zM7 11.828L11.828 7 7 2.172 2.172 7 7 11.828z"
            fillRule="evenodd"
            fillOpacity="1"
            stroke="none"
          />
        </svg>
      </span>
    );
  }
);
Icon.register('DownArrow', function DownArrow() {
  return (
    <span role="img" aria-label="down-arrow" className="anticon down-arrow">
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z"
          fillRule="evenodd"
          fillOpacity="1"
          stroke="none"
        ></path>
      </svg>
    </span>
  );
});
Icon.register('Arrow', function Arrow({ onClick, className }: IconProps) {
  return (
    <a
      onClick={onClick}
      role="img"
      aria-label="arrow"
      className={classnames('anticon arrow-icon', className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 12 12"
        aria-hidden="true"
      >
        <path d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"></path>
      </svg>
    </a>
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
Icon.register(
  'ToolbarBack',
  function ToolbarBack({ onClick, className }: IconProps) {
    return (
      <a
        onClick={onClick}
        role="img"
        aria-label="toolbar-back"
        className={classnames('anticon toolbar-back', className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 8 12"
          aria-hidden="true"
          width="1em"
          height="1em"
          fill="currentColor"
          type="dora"
        >
          <path d="M7.137 10.872a1.04 1.04 0 0 0 0-1.578L2.994 5.6l4.143-3.694a1.04 1.04 0 0 0 0-1.578 1.343 1.343 0 0 0-1.759 0L.363 4.81a1.042 1.042 0 0 0 0 1.58l5.015 4.482a1.343 1.343 0 0 0 1.76 0z"></path>
        </svg>
      </a>
    );
  }
);
