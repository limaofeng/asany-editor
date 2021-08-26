import { isEqual } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from '../../hooks';
import { UIActionType } from '../../reducers/actions';
import { visibleFilter } from '../../utils';
import { DynaActionFormContext } from '../../utils/BlockAside';
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
  const initialValue = useSelector((state) => state.ui.aside.options?.value);
  const handleChange = useSelector((state) => state.ui.aside.options?.update);
  const watchValue = useSelector((state) => state.ui.aside.options?.watchValue, isEqual);
  const scenaToolbarVisible = useSelector((state) => state.ui.scena.toolbar.visible);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!watchValue) {
      return;
    }
    return watchValue(setValue);
  }, [watchValue]);

  const handleClose = useCallback(() => dispatch({ type: UIActionType.CloseAside }), []);

  const configuration = useRef<IPropertiesPanel>(null);

  useEffect(() => {
    dispatch({
      type: UIActionType.AsideRef,
      payload: configuration,
    });
  }, []);

  const tabs = useMemo(() => {
    return externalTabs.map((item) => ({
      ...item,
      content: <item.content onChange={handleChange} />,
    }));
  }, [externalTabs]);

  useEffect(() => {
    const { container } = configuration.current!;
    const navHeight = parseInt(getComputedStyle(container).getPropertyValue('--editor-navigation-height'));
    const top = navHeight + (scenaToolbarVisible ? 40 : 0);
    setTop(top);
  }, [scenaToolbarVisible]);

  return (
    <DynaActionFormContext.Provider value={value}>
      <PropertiesPanel
        className="sketch-configuration"
        ref={configuration}
        style={{
          top: top,
          width,
          ...(visible ? {} : { transform: `translate3d(${width}px, 0, 0)` }),
        }}
        tabs={tabs.filter(visibleFilter(value))}
        footer={<ConfigurationToolbar />}
        onClose={handleClose}
      />
    </DynaActionFormContext.Provider>
  );
}

export default React.memo(Aside);
