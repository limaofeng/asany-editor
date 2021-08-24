import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { IconLibraryDefinition, parseIconFile } from '@asany/icons';

import { ComponentPropertyType } from '../../../src/typings';
import { createDynaActionForm } from '../../../src/utils/BlockAside';

const IMPORT_ICONS = gql`
  mutation($library: ID!, $icons: [IconInput]!) {
    icons: importIcons(library: $library, icons: $icons) {
      id
      name
      tags
      unicode
      content
      description
      library: libraryId
    }
  }
`;

interface GlobalPanelProps {
  refresh: () => Promise<void>;
  library: IconLibraryDefinition;
}

function GlobalPanel(props: GlobalPanelProps) {
  const { library, refresh } = props;

  const file = useRef<HTMLInputElement>(null);

  const [importIcons] = useMutation(IMPORT_ICONS);

  const handleChooseFile = useCallback(() => {
    file.current?.click();
  }, []);
  const handleImportFile = useCallback(async (e) => {
    console.log(e.target.files, parseIconFile, props.library, importIcons);
    const files: File[] = Array.from(e.target.files);
    const icons = await Promise.all(files.map((file) => parseIconFile(file))).then((array) =>
      array.reduce((all, item) => [...all, ...item])
    );
    file.current?.setAttribute('type', 'text');
    file.current?.setAttribute('type', 'file');
    await importIcons({
      variables: {
        library: library.id,
        icons,
      },
    });
    refresh();
  }, []);

  return (
    <div className="global-panel">
      <div className="import-icons">
        <span className="import-icon-container">
          <svg width="1em" height="1em" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M59 1H5C2.79086 1 1 2.79086 1 5V59C1 61.2091 2.79086 63 5 63H59C61.2091 63 63 61.2091 63 59V5C63 2.79086 61.2091 1 59 1Z"
              stroke="#b8c2cc"
              strokeDasharray="8 2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.5018 17C30.3692 17 30.242 17.0527 30.1482 17.1465C30.0545 17.2403 30.0018 17.3674 30.0018 17.5V21.2539L27.285 19.2773C27.2033 19.217 27.1052 19.1829 27.0037 19.1797C26.93 19.1773 26.8566 19.1914 26.7889 19.2207C23.293 20.7393 19.7985 22.2587 16.3026 23.7773C16.1982 23.8222 16.1122 23.9012 16.0588 24.0015C16.0054 24.1017 15.9876 24.2171 16.0086 24.3287C16.0295 24.4403 16.0878 24.5415 16.1739 24.6156C16.26 24.6897 16.3687 24.7323 16.4823 24.7363H16.3377L20.7069 27.9121L16.2069 31.1836C16.1218 31.2454 16.0584 31.3325 16.0257 31.4324C15.993 31.5323 15.9926 31.64 16.0247 31.7401C16.0567 31.8403 16.1194 31.9278 16.204 31.9902C16.2886 32.0526 16.3908 32.0868 16.4959 32.0879H16.3983L21.0018 34.0879V41.4922C21.0005 41.5215 21.0018 41.551 21.0057 41.5801C20.9914 41.6895 21.0138 41.8005 21.0693 41.8959C21.1247 41.9913 21.2102 42.0657 21.3123 42.1074L31.6893 46.5371C31.7895 46.6104 31.9134 46.6438 32.0369 46.6309C32.1263 46.6257 32.2126 46.5967 32.2869 46.5469L42.6912 42.1074C42.7909 42.0667 42.8748 41.9949 42.9304 41.9027C42.986 41.8105 43.0104 41.7028 42.9998 41.5957C43.0016 41.5834 43.0029 41.571 43.0037 41.5586V34.0547L47.6073 32.0566H47.5018C47.6074 32.0568 47.7104 32.0235 47.796 31.9615C47.8815 31.8995 47.9452 31.8121 47.978 31.7116C48.0107 31.6112 48.0108 31.503 47.9783 31.4025C47.9457 31.3021 47.8822 31.2145 47.7967 31.1523L43.1483 27.7715C43.1422 27.7529 43.135 27.7346 43.1268 27.7168L47.203 24.7539H47.0409C47.156 24.7541 47.2677 24.7146 47.3571 24.642C47.4465 24.5695 47.508 24.4683 47.5315 24.3556C47.5549 24.2429 47.5387 24.1256 47.4856 24.0234C47.4325 23.9213 47.3458 23.8406 47.2401 23.7949C43.7441 22.2763 40.2477 20.7569 36.7518 19.2383C36.6901 19.2116 36.6237 19.1977 36.5565 19.1973C36.4407 19.1964 36.3281 19.2358 36.2381 19.3086L33.9979 21.1074V17.502C33.9979 17.3694 33.9452 17.2422 33.8515 17.1484C33.7577 17.0547 33.6305 17.002 33.4979 17.002H30.5018V17ZM31.0018 18H32.9959V25.0195C32.9959 25.1498 33.0467 25.2749 33.1375 25.3683C33.2283 25.4617 33.352 25.5159 33.4823 25.5195L34.2381 25.541C34.242 25.5411 34.2459 25.5411 34.2498 25.541H35.3319L32.0135 28.998L28.6795 25.5273H29.7498C29.7537 25.5274 29.7577 25.5274 29.7616 25.5273L30.5096 25.5117C30.6409 25.5096 30.7661 25.456 30.8581 25.3625C30.9502 25.269 31.0018 25.143 31.0018 25.0117V18ZM26.9276 20.2539L29.9334 22.4395C29.955 22.4563 29.9778 22.4713 30.0018 22.4844V24.5273L29.7479 24.5371L27.5037 24.5273C27.3819 24.5274 27.2643 24.5718 27.173 24.6524C27.0817 24.7329 27.0229 24.844 27.0077 24.9648L21.535 27.2773L17.5037 24.3457C20.6448 22.9813 23.7865 21.6183 26.9276 20.2539ZM36.6307 20.2773C39.7664 21.6395 42.9012 23.0012 46.0369 24.3633L42.1932 27.1582L36.9881 24.9336C36.9615 24.8252 36.8994 24.7287 36.8116 24.6597C36.7238 24.5907 36.6154 24.553 36.5037 24.5527L34.2596 24.5449L33.9979 24.5352V22.3438C34.0574 22.3256 34.1131 22.2964 34.1619 22.2578L36.6307 20.2773ZM36.4784 25.8027L41.3866 27.9004L32.0018 31.9121L28.9823 30.6211L25.1053 28.9648L22.6229 27.9043L27.5643 25.8145L31.6522 30.0742C31.6989 30.123 31.755 30.1618 31.8171 30.1883C31.8792 30.2148 31.946 30.2285 32.0135 30.2285C32.081 30.2285 32.1479 30.2148 32.21 30.1883C32.2721 30.1618 32.3282 30.123 32.3748 30.0742L36.4784 25.8027ZM42.4842 28.5176L46.4998 31.4375L42.453 33.1953C42.3489 33.2053 42.2505 33.2476 42.1717 33.3164L37.076 35.5293L33.0057 32.5703L42.4842 28.5176ZM21.5506 28.5312L24.7127 29.8828L28.5897 31.541L31.0311 32.5859L26.9276 35.5684L21.9491 33.4062C21.9076 33.3211 21.8429 33.2495 21.7623 33.1997C21.6817 33.1499 21.5887 33.124 21.494 33.125C21.4469 33.1262 21.4002 33.1341 21.3553 33.1484L17.5037 31.4746L21.5506 28.5312ZM32.5018 33.4375L36.7049 36.4941C36.7094 36.4988 36.7139 36.5033 36.7186 36.5078H36.7205C36.7469 36.5268 36.775 36.5431 36.8045 36.5566C36.8052 36.5566 36.8058 36.5566 36.8065 36.5566C36.8103 36.56 36.8142 36.5632 36.8182 36.5664C36.8448 36.5772 36.8722 36.5857 36.9002 36.5918C36.9163 36.5959 36.9326 36.5991 36.9491 36.6016C36.9497 36.6016 36.9504 36.6016 36.951 36.6016C36.9665 36.6056 36.9821 36.6088 36.9979 36.6113C36.9985 36.6113 36.9992 36.6113 36.9998 36.6113C37.005 36.6114 37.0103 36.6114 37.0155 36.6113C37.049 36.6108 37.0823 36.6068 37.1151 36.5996C37.1309 36.5965 37.1465 36.5925 37.1619 36.5879C37.1779 36.5822 37.1935 36.5757 37.2088 36.5684C37.2108 36.5684 37.2127 36.5684 37.2147 36.5684L42.0018 34.4902V41.3145L32.5018 45.3691V33.4375ZM31.5018 33.4766V45.3691L22.0018 41.3145V34.5234L26.7889 36.6035C26.8043 36.6095 26.8199 36.6147 26.8358 36.6191C26.8473 36.6235 26.8591 36.6274 26.8709 36.6309C26.8755 36.6309 26.88 36.6309 26.8846 36.6309C26.9007 36.6343 26.917 36.6369 26.9334 36.6387C26.9503 36.6395 26.9673 36.6395 26.9842 36.6387C26.9849 36.6387 26.9855 36.6387 26.9862 36.6387C26.9868 36.6387 26.9875 36.6387 26.9881 36.6387C27.005 36.6395 27.022 36.6395 27.0389 36.6387C27.0553 36.6369 27.0716 36.6343 27.0877 36.6309C27.1589 36.6169 27.2263 36.5875 27.285 36.5449L31.5018 33.4766ZM36.4725 39.0215C36.4105 39.0245 36.3495 39.0391 36.2928 39.0645L33.6346 40.2012C33.5706 40.2243 33.512 40.2603 33.4624 40.3069C33.4128 40.3535 33.3732 40.4097 33.3461 40.4721C33.319 40.5345 33.3049 40.6018 33.3047 40.6699C33.3045 40.7379 33.3182 40.8053 33.3449 40.8679C33.3717 40.9304 33.4109 40.9869 33.4603 41.0338C33.5096 41.0806 33.568 41.1169 33.6319 41.1405C33.6958 41.164 33.7638 41.1742 33.8317 41.1706C33.8997 41.1669 33.9662 41.1494 34.0272 41.1191L36.6854 39.9844C36.795 39.9401 36.8854 39.8584 36.9405 39.7537C36.9956 39.6491 37.0119 39.5284 36.9863 39.4129C36.9608 39.2975 36.8952 39.1948 36.8011 39.1231C36.707 39.0515 36.5906 39.0155 36.4725 39.0215V39.0215ZM39.1287 39.7031C39.0667 39.7062 39.0058 39.7207 38.9491 39.7461L36.2928 40.8809L33.6346 42.0176C33.5724 42.0421 33.5157 42.0788 33.4679 42.1256C33.4201 42.1724 33.3822 42.2283 33.3563 42.29C33.3305 42.3517 33.3173 42.4179 33.3176 42.4848C33.3178 42.5517 33.3315 42.6178 33.3577 42.6794C33.384 42.7409 33.4223 42.7965 33.4704 42.8429C33.5185 42.8894 33.5755 42.9257 33.6379 42.9498C33.7003 42.9739 33.7669 42.9852 33.8338 42.9831C33.9007 42.981 33.9664 42.9655 34.0272 42.9375L36.6854 41.8008L39.3436 40.6641C39.4521 40.6188 39.5411 40.5369 39.5952 40.4325C39.6492 40.3282 39.6648 40.2082 39.6392 40.0935C39.6135 39.9789 39.5483 39.8769 39.455 39.8055C39.3616 39.7341 39.2461 39.6979 39.1287 39.7031V39.7031Z"
              fill="#dae1e6"
            />
          </svg>
        </span>
        <p className="font-normal font-lf-regular text-center leading-normal  text-grey-darker">
          Drag and drop your SVG file here
        </p>
        <p className="font-normal font-lf-regular text-center py-2 leading-normal text-grey-dark">or</p>
        <div className="text-center pt-2">
          <button
            onClick={handleChooseFile}
            className="trans mx-auto rounded-lg shadow px-8 py-2 text-sm font-lf-regular cursor-pointer text-grey-darker border-grey-dark border-2"
          >
            Browse your SVG file
          </button>
          <input
            multiple
            accept=".svg,.ttf,.woff"
            ref={file}
            onChange={handleImportFile}
            type="file"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

interface LibraryControlPanelProps {
  refresh: () => Promise<void>;
  library: IconLibraryDefinition;
}

function LibraryControlPanel(props: LibraryControlPanelProps) {
  const DynaActionForm = useMemo(
    () =>
      createDynaActionForm({
        fields: [
          {
            name: 'name',
            type: ComponentPropertyType.String,
            placeholder: 'Untitled Name',
          },
          {
            name: 'unicode',
            type: ComponentPropertyType.String,
            placeholder: 'Untitled Unicode',
          },
        ],
      }),
    []
  );

  console.log(DynaActionForm);

  return (
    <div className="sketch-configuration-body scrollbars-visible">
      <GlobalPanel {...props} />
    </div>
  );
}

export default memo(LibraryControlPanel);
