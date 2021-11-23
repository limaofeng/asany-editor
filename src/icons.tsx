import { store } from '@asany/icons';

const icons = [
  {
    name: 'Cross',
    svg: `<svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-3 -3 14 14"
        width="1em"
        height="1em"
      >
        <path d="M 8 6.77 C 8 6.77 6.77 8 6.77 8 C 6.77 8 4 5.23 4 5.23 C 4 5.23 1.23 8 1.23 8 C 1.23 8 0 6.77 0 6.77 C 0 6.77 2.77 4 2.77 4 C 2.77 4 0 1.23 0 1.23 C 0 1.23 1.23 0 1.23 0 C 1.23 0 4 2.77 4 2.77 C 4 2.77 6.77 0 6.77 0 C 6.77 0 8 1.23 8 1.23 C 8 1.23 5.23 4 5.23 4 C 5.23 4 8 6.77 8 6.77 Z" />
      </svg>`,
  },
  {
    name: 'LayoutGrid',
    svg: `<svg viewBox="0 0 32 32" focusable="false" class="" data-icon="layout-grid" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M.07 0v14.06h14.06V0H.07zm17.85 0v14.06h14.06V0H17.92zM.07 17.9v14.06h14.06V17.9H.07zm17.85 0v14.06h14.06V17.9H17.92z"></path></svg>`,
  },
  {
    name: 'HandDrag',
    svg: `<svg width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M5,19h9c0,0,2.8-9,3.8-11.4c0.9-2.5-1.4-3-2.2-0.7c-0.6,1.7-1.1,1.9-1.1,1.9s-1,0-0.8-1 c0.2-1.3,0.5-3,0.9-5.4c0.3-1.5-2.2-1.8-2.4-0.5c-0.2,1.3-0.7,4.6-0.9,5.4c-0.1,0.8-1.1,1.4-1.2-0.5C10.1,5.5,10,3.7,10,1.2 c0-1.7-2.7-1.5-2.7,0.1c0,1.1,0.1,5.5,0.1,6.3c0,0.8-0.4,1.1-0.9-0.1c-0.6-1.3-1.2-2.8-1.7-4C3.9,1.7,1.8,2.9,2.3,4.2 c0.4,1.1,1.5,3.6,2.3,5.5c0.4,1,1,2.9-0.4,1.9c-0.9-0.7-1.3-1.4-2.4-2.1s-2.2,0.8-1.7,1.3c0.9,1.2,2.6,2.9,3.6,4.6 C4.5,16.7,5,19,5,19z" /></svg>`,
  },
  {
    name: 'Plus',
    svg: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="1em"
    height="1em"
    viewBox="0 0 14 14"
    aria-hidden="true"
  >
    <path d="M8 1v5h5v2H8v5H6V8H1V6h5V1h2z" fillRule="evenodd"></path>
  </svg>`,
  },
  {
    name: 'Folder',
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        width="1em"
        height="1em"
        viewBox="0 0 14 14"
        aria-hidden="true"
      >
        <path
          d="M2 3v8h10V5H7.172l-2-2H2zm6 0h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5l2 2z"
          fillRule="evenodd"
        ></path>
      </svg>`,
  },
  {
    name: 'HandTouchSolid',
    svg: `<svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <title>hand-touch</title>
        <path d="M25.167 14.153c-0.552 0-1.065 0.163-1.492 0.44-0.363-1.017-1.361-1.773-2.508-1.773-0.552 0-1.065 0.163-1.492 0.44-0.363-1.017-1.361-1.773-2.508-1.773-0.489 0-0.941 0.137-1.333 0.359v-5.787c0-1.417-1.196-2.572-2.667-2.572-1.445 0-2.667 1.192-2.667 2.6v10.932l-1.884-1.935c-1.007-1.005-2.671-0.976-3.711 0.061-0.936 0.937-0.987 2.441-0.123 3.657 0.589 0.831 1.296 2.369 2.045 3.999 1.98 4.311 4.224 9.196 7.389 9.196h7.533c0.084 0 0.168-0.017 0.248-0.047 0.24-0.096 5.836-2.396 5.836-7.984v-7.213c-0.001-1.408-1.223-2.6-2.668-2.6zM9.167 11.503v-5.416c0-2.135 1.832-3.935 4-3.935 2.205 0 4 1.751 4 3.907v4.093c0.377 0 0.74 0.072 1.089 0.172 0.879-1.117 1.379-2.468 1.379-3.905 0-1.716-0.68-3.331-1.917-4.547-2.539-2.495-6.675-2.495-9.22 0.001-1.232 1.215-1.913 2.829-1.913 4.545 0 1.719 0.68 3.333 1.916 4.547 0.205 0.204 0.44 0.367 0.667 0.537z"></path>
      </svg>`,
  },
  {
    name: 'FieldsetExpand',
    svg: `
      <svg
        viewBox="0 0 12 12"
        focusable="false"
        width="1em"
        height="1em"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M5.525 5.50785V0.482849H6.475V5.50785H11.5V6.45785H6.475V11.4828H5.525V6.45785H0.5V5.50785H5.525Z"
        />
      </svg>`,
  },

  {
    name: 'FieldsetCollapsed',
    svg: `<svg
        viewBox="0 0 12 6"
        width="1em"
        height="1em"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.5 3.5H0.5V2.5H11.5V3.5Z" fill="currentColor" />
      </svg>`,
  },

  {
    name: 'ArrowBottom',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M3.64453 4.354L0.644531 1.354L1.35253 0.645996L3.99853 3.293L6.64453 0.645996L7.35253 1.354L4.35253 4.354L3.99853 4.707L3.64453 4.354Z"
          fill="currentColor"
        />
      </svg>`,
  },

  {
    name: 'VectorAlign',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 13.5V0.5H0V13.5H1ZM12 0.5V13.5H11V0.5H12ZM7 3.5V10.5H5V3.5H7Z"
          fill="currentColor"
        />
      </svg>`,
  },

  {
    name: 'AlignBottom',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 0V10H3.5V0H5.5ZM13.5 12V13H0.5V12H13.5ZM10.5 10V4H8.5V10H10.5Z"
          fill="currentColor"
        />
      </svg>`,
  },

  {
    name: 'AlignHorizontalCenters',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 0.5H5.5V3.5H0.5V5.5H5.5V8.5H2.5V10.5H5.5V13.5H6.5V10.5H9.5V8.5H6.5V5.5H11.5V3.5H6.5V0.5Z"
          fill="currentColor"
        />
      </svg>`,
  },

  {
    name: 'AlignLeft',
    svg: ` <svg
        width="1em"
        height="1em"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 13.5H0V0.5H1V13.5ZM13 5.5H3V3.5H13V5.5ZM3 10.5H9V8.5H3V10.5Z"
          fill="currentColor"
        />
      </svg>`,
  },

  {
    name: 'AlignVerticalCenters',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 5.5V0.5H5.5V5.5H8.5V2.5H10.5V5.5H13.5V6.5H10.5V9.5H8.5V6.5H5.5V11.5H3.5V6.5H0.5V5.5H3.5Z"
          fill="currentColor"
        />
      </svg>`,
  },
  {
    name: 'ConstrainProportionsOff',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 6 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5V3c0-1.105-.895-2-2-2-1.105 0-2 .895-2 2v2H0V3c0-1.657 1.343-3 3-3 1.657 0 3 1.343 3 3v2H5zm1 4H5v2c0 1.105-.895 2-2 2-1.105 0-2-.895-2-2V9H0v2c0 1.657 1.343 3 3 3 1.657 0 3-1.343 3-3V9z"
          fill-rule="evenodd"
          fill-opacity="1"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'ConstrainProportionsOn',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 6 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 1c1.105 0 2 .895 2 2v2h1V3c0-1.657-1.343-3-3-3-1.657 0-3 1.343-3 3v2h1V3c0-1.105.895-2 2-2zm2 8h1v2c0 1.657-1.343 3-3 3-1.657 0-3-1.343-3-3V9h1v2c0 1.105.895 2 2 2 1.105 0 2-.895 2-2V9zM2.5 4v6h1V4h-1z"
          fill-rule="evenodd"
          fill-opacity="1"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'TopLeftCornerRadius',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 4.5C0 2.015 2.015 0 4.5 0H8v1H4.5C2.567 1 1 2.567 1 4.5V8H0V4.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        />
      </svg>`,
  },
  {
    name: 'TopRightCornerRadius',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4.5C8 2.015 5.985 0 3.5 0H0v1h3.5C5.433 1 7 2.567 7 4.5V8h1V4.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'BottomRightCornerRadius',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.5C8 5.985 5.985 8 3.5 8H0V7h3.5C5.433 7 7 5.433 7 3.5V0h1v3.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'BottomLeftCornerRadius',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3.5C0 5.985 2.015 8 4.5 8H8V7H4.5C2.567 7 1 5.433 1 3.5V0H0v3.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'Landscape',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 14 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1v6h12V1H1zM0 7v1h14V0H0v7z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'VectorRetract',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.644531 1.35058L4.29153 4.99658H1.99853V5.99658H5.99853V1.99658H4.99853V4.28958L1.35253 0.642578L0.644531 1.35058ZM11.7055 4.99658L15.3525 1.35058L14.6455 0.642578L10.9985 4.28958V1.99658H9.99853V5.99658H13.9985V4.99658H11.7055ZM11.7055 10.9966L15.3525 14.6426L14.6455 15.3506L10.9985 11.7036V13.9966H9.99853V9.99658H13.9985V10.9966H11.7055ZM4.29153 10.9966L0.644531 14.6426L1.35253 15.3506L4.99853 11.7036V13.9966H5.99853V9.99658H1.99853V10.9966H4.29153Z" />
      </svg>`,
  },
  {
    name: 'AlignRight',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 13.5H13V0.5H12V13.5ZM0 5.5H10V3.5H0V5.5ZM10 10.5H4V8.5H10V10.5Z"
          fill="currentColor"
        />
      </svg>`,
  },
  {
    name: 'VectorRotate',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 8 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clipRule="evenodd"
          d="M0 0.996582V8.99658H8V7.99658H5C5 5.78658 3.21 3.99658 1 3.99658V0.996582H0ZM1 4.99658V7.99658H4C4 6.33958 2.657 4.99658 1 4.99658Z"
          fill="currentColor"
        />
      </svg>`,
  },
  {
    name: 'VectorSemicircle',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0.996582H3V1.99658H1V3.99658H0V0.996582ZM7 0.996582H10V3.99658H9V1.99658H7V0.996582ZM1 9.99658V7.99658H0V10.9966H3V9.99658H1ZM10 7.99658V10.9966H7V9.99658H9V7.99658H10Z"
          fill="currentColor"
        />
      </svg>`,
  },
  {
    name: 'AlignTop',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 1V0H0.5V1H13.5ZM5.5 13V3H3.5V13H5.5ZM10.5 3V9H8.5V3H10.5Z"
          fill="currentColor"
        />
      </svg>`,
  },
  {
    name: 'Portrait',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1H1v12h6V1zM1 0H0v14h8V0H1z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },

  {
    name: 'VectorCorrect',
    svg: `<svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.207 5.207L7 11.414 3.292 7.707l1.415-1.414L7 8.586l4.793-4.793 1.414 1.414z"
        fill-rule="nonzero"
        fill-opacity="1"
        fill="currentColor"
        stroke="none"
      ></path>
    </svg>`,
  },
  {
    name: 'VectorArrowButtom',
    svg: `<svg
      width="1em"
      height="1em"
      viewBox="0 0 11 7"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M10.707 3.49316L7.354 0.13916L6.646 0.84716L8.793 2.99316H0.5V3.99316H8.793L6.646 6.13916L7.354 6.84716L10.707 3.49316Z"
      />
    </svg>`,
  },
  {
    name: 'VectorArrowRight',
    svg: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M4 11.2002L0.645996 7.84716L1.354 7.13916L3.5 9.28616V0.993164H4.5V9.28616L6.646 7.13916L7.354 7.84716L4 11.2002Z"
        fill="currentColor"
      />
    </svg>`,
  },
  {
    name: 'AlignmentAndPadding',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3v1h6V3H3zm0 2.5v1h8v-1H3zM3 8v1h4V8H3z"
          fill-rule="nonzero"
          fill-opacity="1"
          stroke="none"
        ></path>
        <path
          d="M14 1H2c-.552 0-1 .448-1 1v12c0 .552.448 1 1 1h12c.552 0 1-.448 1-1V2c0-.552-.448-1-1-1zM2 0C.895 0 0 .895 0 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V2c0-1.105-.895-2-2-2H2z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'ResizeToFit',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.646 1.354L4.293 5H2v1h4V2H5v2.293L1.354.646l-.708.708zM11.707 5l3.647-3.646-.707-.708L11 4.293V2h-1v4h4V5h-2.293zm0 6l3.647 3.646-.707.708L11 11.707V14h-1v-4h4v1h-2.293zm-7.414 0L.646 14.646l.708.708L5 11.707V14h1v-4H2v1h2.293z"
          fill-rule="nonzero"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'VectorSpacing',
    svg: `<svg
      width="1em"
      height="1em"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 13.9932V11.9932H1V13.9932H0V10.9932H12V13.9932H11ZM12 3.99316H0V0.993164H1V2.99316H11V0.993164H12V3.99316ZM9 7.99316V6.99316H3V7.99316H9Z"
        fill="currentColor"
      />
    </svg>`,
  },
  {
    name: 'VectorPadding',
    svg: `<svg
      width="1em"
      height="1em"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M3 3.99316H9V9.99316H3V3.99316ZM4 4.99316H8V8.99316H4V4.99316ZM0 0.993164H12V12.9932H0V0.993164ZM1 1.99316H11V11.9932H1V1.99316Z"
        fill="currentColor"
      />
    </svg>`,
  },
  {
    name: 'VectorRadiusLT',
    svg: `<span
      role="img"
      aria-label="fieldset-expand"
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.39844 1.99658H5.39844C3.18844 1.99658 1.39844 3.78658 1.39844 5.99658V9.99658H0.398438V5.99658C0.398438 3.23558 2.63744 0.996582 5.39844 0.996582H9.39844V1.99658Z"
          fill="currentColor"
        />
      </svg>`,
  },
  {
    name: 'VectorRadiusRT',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4.5C8 2.015 5.985 0 3.5 0H0v1h3.5C5.433 1 7 2.567 7 4.5V8h1V4.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'VectorRadiusLB',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3.5C0 5.985 2.015 8 4.5 8H8V7H4.5C2.567 7 1 5.433 1 3.5V0H0v3.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'VectorRadiusRB',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 8 8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.5C8 5.985 5.985 8 3.5 8H0V7h3.5C5.433 7 7 5.433 7 3.5V0h1v3.5z"
          fill-rule="evenodd"
          fill-opacity="1"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'VectorSubtraction',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 12 6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 3.5H.5v-1h11v1z"
          fill-rule="nonzero"
          fill-opacity="1"
          fill="currentColor"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'VectorEyes',
    svg: `<svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10c1.105 0 2-.895 2-2 0-1.105-.895-2-2-2-1.104 0-2 .895-2 2 0 1.105.896 2 2 2z"
          fill-rule="nonzero"
          fill-opacity="1"
          fill="#000"
          stroke="none"
        ></path>
        <path
          d="M8 4c2.878 0 5.378 1.621 6.635 4-1.257 2.379-3.757 4-6.635 4-2.878 0-5.377-1.621-6.635-4C2.623 5.621 5.122 4 8 4zm0 7c-2.3 0-4.322-1.194-5.478-3C3.678 6.194 5.7 5 8 5c2.3 0 4.322 1.194 5.479 3C12.322 9.806 10.3 11 8 11z"
          fill-rule="evenodd"
          fill-opacity="1"
          fill="#000"
          stroke="none"
        ></path>
      </svg>`,
  },

  {
    name: 'ComponentInstance',
    svg: `<svg
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.828 7L7 .828 13.172 7 7 13.172.828 7zM7 11.828L11.828 7 7 2.172 2.172 7 7 11.828z"
            fill-rule="evenodd"
            fill-opacity="1"
            stroke="none"
          />
        </svg>`,
  },
  {
    name: 'DownArrow',
    svg: `<svg
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 8 7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z"
          fill-rule="evenodd"
          fill-opacity="1"
          stroke="none"
        ></path>
      </svg>`,
  },
  {
    name: 'Arrow',
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 12 12"
        aria-hidden="true"
      >
        <path d="M6 6.82l2.494-2.555a.867.867 0 0 1 1.248 0 .919.919 0 0 1 0 1.277L6.624 8.735a.867.867 0 0 1-1.248 0L2.258 5.542a.919.919 0 0 1 0-1.277.867.867 0 0 1 1.248 0L6 6.819z"></path>
      </svg>`,
  },
  {
    name: 'SelectFilled',
    svg: `<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0,0l6,18l2-9h8L0,0z" />
      </svg>`,
  },
  {
    name: 'Move',
    svg: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" fill="currentColor" width="1em" height="1em" >
      <g>
        <path d="M256,512c-3.838,0-7.676-1.465-10.605-4.395l-90-90c-4.292-4.292-5.581-10.737-3.252-16.348    c2.314-5.61,7.793-9.258,13.857-9.258h45v-91h-91v45c0,6.064-3.647,11.543-9.258,13.857c-5.596,2.358-12.056,1.055-16.348-3.252    l-90-90c-5.859-5.859-5.859-15.352,0-21.211l90-90c4.292-4.307,10.737-5.596,16.348-3.252c5.61,2.314,9.258,7.793,9.258,13.857v45    h91v-91h-45c-6.064,0-11.543-3.647-13.857-9.258c-2.329-5.61-1.04-12.056,3.252-16.348l90-90c5.859-5.859,15.352-5.859,21.211,0    l90,90c4.292,4.292,5.581,10.737,3.252,16.348C357.543,116.353,352.064,120,346,120h-45v91h91v-45    c0-6.064,3.647-11.543,9.258-13.857c5.654-2.329,12.07-1.025,16.348,3.252l90,90c5.859,5.859,5.859,15.352,0,21.211l-90,90    c-4.277,4.277-10.723,5.596-16.348,3.252C395.647,357.543,392,352.064,392,346v-45h-91v91h45c6.064,0,11.543,3.647,13.857,9.258    c2.329,5.61,1.04,12.056-3.252,16.348l-90,90C263.676,510.535,259.838,512,256,512z"/>
      </g>
    </svg>`,
  },
  {
    name: 'ToolbarBack',
    svg: `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 8 12"
          aria-hidden="true"
          width="1em"
          height="1em"
          fill="currentColor"
          type="dora"
        >
          <path d="M7.137 10.872a1.04 1.04 0 0 0 0-1.578L2.994 5.6l4.143-3.694a1.04 1.04 0 0 0 0-1.578 1.343 1.343 0 0 0-1.759 0L.363 4.81a1.042 1.042 0 0 0 0 1.58l5.015 4.482a1.343 1.343 0 0 0 1.76 0z"></path>
        </svg>`,
  },

  {
    name: 'IconHand',
    svg: `<svg
          width="1em"
          height="1em"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0  18 18"
          >
          <path d="M5,19h9c0,0,2.8-9,3.8-11.4c0.9-2.5-1.4-3-2.2-0.7c-0.6,1.7-1.1,1.9-1.1,1.9s-1,0-0.8-1 c0.2-1.3,0.5-3,0.9-5.4c0.3-1.5-2.2-1.8-2.4-0.5c-0.2,1.3-0.7,4.6-0.9,5.4c-0.1,0.8-1.1,1.4-1.2-0.5C10.1,5.5,10,3.7,10,1.2 c0-1.7-2.7-1.5-2.7,0.1c0,1.1,0.1,5.5,0.1,6.3c0,0.8-0.4,1.1-0.9-0.1c-0.6-1.3-1.2-2.8-1.7-4C3.9,1.7,1.8,2.9,2.3,4.2 c0.4,1.1,1.5,3.6,2.3,5.5c0.4,1,1,2.9-0.4,1.9c-0.9-0.7-1.3-1.4-2.4-2.1s-2.2,0.8-1.7,1.3c0.9,1.2,2.6,2.9,3.6,4.6 C4.5,16.7,5,19,5,19z" />
          </svg>`,
  },

  {
    name: 'Layers',
    svg: `<svg
          width="1em"
          height="1em"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          >
          <path d="M0 7.5l1.8-.9L8 10.1l6.2-3.6L16 7.5l-8 4.6L0 7.5zM0 4.2L8 0l8 4.2L8 8.8 0 4.2zM8 13.4l5.6-3.2 2.4 1.3L8 16l-8-4.6 2.4-1.3L8 13.4z" />
          </svg>`,
  },

  {
    name: 'SketchFrame',
    svg: `<svg
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path
            d="M3 16v-3H0v-1h3V4H0V3h3V0h1v3h8V0h1v3h3v1h-3v8h3v1h-3v3h-1v-3H4v3H3zm9-4V4H4v8h8z"
            fill-rule="evenodd"
            fill-opacity="1"
            stroke="none"
          ></path>
          </svg>`,
  },

  {
    name: 'SketchImage',
    svg: `<svg
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M12.5 10c1.38 0 2.5-1.12 2.5-2.5C15 6.12 13.88 5 12.5 5 11.12 5 10 6.12 10 7.5c0 1.38 1.12 2.5 2.5 2.5zM14 7.5c0 .828-.672 1.5-1.5 1.5-.828 0-1.5-.672-1.5-1.5 0-.828.672-1.5 1.5-1.5.828 0 1.5.672 1.5 1.5zM17 1H1v16h16V1zm-1 1v14h-1.293L6 7.293l-4 4V2h14zM2 16v-3.293l4-4L13.293 16H2z"
              fill-rule="evenodd"
              fill-opacity="1"
              stroke="none"
            ></path>
            </svg>`,
  },
];

store.addIcons('AsanyEditor', '1.0', icons);
