import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { isEqual } from 'lodash-es';

import { useDispatch, useSelector } from '../../hooks';
import { UIActionType } from '../../reducers/actions';
import { visibleFilter } from '../../utils';
import { DynaActionFormContext, buildAside } from '../../utils/BlockAside';

import ConfigurationToolbar from './ConfigurationToolbar';
import PropertiesPanel, { IPropertiesPanel } from './PropertiesPanel';

interface AsideProps {}

/**
 * 定制面板
 * @param props
 */
function Aside(_: AsideProps) {
  const visible = useSelector((state) => state.ui.aside.visible);

  const dispatch = useDispatch();

  const [top, setTop] = useState(60);

  const externalTabs = useSelector((state) => state.ui.aside.tabs);
  const width = useSelector((state) => state.ui.aside.options?.width || 240);
  const scenaToolbarVisible = useSelector((state) => state.ui.scena.toolbar.visible);

  const customizer = useSelector((state) => state.ui.aside.block?.customizer);
  const initialValue = useSelector((state) => state.ui.aside.block?.value);
  const handleChange = useSelector((state) => state.ui.aside.block?.update);
  const watchValue = useSelector((state) => state.ui.aside.block?.watchValue, isEqual);

  const cache = useRef({ value: initialValue });

  const [, forceRender] = useReducer((s) => s + 1, 0);

  useEffect(() => {
    if (!watchValue) {
      return;
    }
    return watchValue((value) => {
      cache.current = value;
      forceRender();
    });
  }, [watchValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClose = useCallback(() => dispatch({ type: UIActionType.CloseAside }), []);

  const configuration = useRef<IPropertiesPanel>(null);

  useEffect(() => {
    dispatch({
      type: UIActionType.AsideRef,
      payload: configuration,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = useMemo(() => {
    cache.current.value = initialValue;
    if (customizer) {
      return buildAside(customizer).map((item) => ({
        ...item,
        content: <item.content value={cache.current.value} onChange={handleChange} />,
      }));
    }
    if (externalTabs) {
      return externalTabs.map((item) => ({
        ...item,
        content: <item.content value={cache.current.value} onChange={handleChange} />,
      }));
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTabs, customizer]);

  useEffect(() => {
    const { container } = configuration.current!;
    const navHeight = parseInt(getComputedStyle(container).getPropertyValue('--editor-navigation-height'));
    const top = navHeight + (scenaToolbarVisible ? 40 : 0);
    setTop(top);
  }, [scenaToolbarVisible]);

  return (
    <DynaActionFormContext.Provider value={cache.current.value}>
      <PropertiesPanel
        className="sketch-configuration"
        ref={configuration}
        style={{
          top: top,
          width,
          ...(visible ? {} : { transform: `translate3d(${width}px, 0, 0)` }),
        }}
        tabs={tabs.filter(visibleFilter(cache.current.value))}
        footer={<ConfigurationToolbar />}
        onClose={handleClose}
      />
    </DynaActionFormContext.Provider>
  );
}

export default React.memo(Aside);
