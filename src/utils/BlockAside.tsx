import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react';

// import ConfigurationPanel from '../../library-manager/ConfigurationPanel';
// import { ComponentPropertyType } from '../../library-manager/typings';

import CurrentElementInformation from '../components/aside/components/CurrentElementInformation';
import FormPanel from '../components/aside/FormPanel';
import { useSelector } from '../hooks';
import { AsideTabPane, ComponentPropertyType, DEFAULT_GROUP_ID, ICustomizer, IFieldGroup } from '../typings';

export function createDynaActionForm(customizer: ICustomizer) {
  return ({ onChange: handleChange }: any) => {
    const value = useSelector((state) => state.current?.value);
    return (
      <div className="sketch-configuration-body scrollbars-visible">
        <OverlayScrollbarsComponent
          options={{ scrollbars: { autoHide: 'scroll' } }}
          style={{ height: 'calc(100vh - 136px)' }}
        >
          <FormPanel
            library="com.thuni.him.asany.properties"
            value={value}
            onChange={handleChange}
            customizer={customizer!}
          />
        </OverlayScrollbarsComponent>
      </div>
    );
  };
}

const createTabPane = (item: any): AsideTabPane => ({
  title: item.name,
  visible: item.visible,
  content: createDynaActionForm(item.customizer),
});

export function buildAside(customizer: ICustomizer) {
  const tabs = [];

  const fields = customizer.fields.map((item) => (item.group ? item : { ...item, group: DEFAULT_GROUP_ID }));
  const sourceGroups = [...(customizer.groups || [])];

  if (customizer.frame) {
    fields.unshift({
      name: 'rect',
      group: 'DEFAULT-rect',
      renderer: CurrentElementInformation,
      type: ComponentPropertyType.JSON,
    });
  }

  const groups = fields.reduce((groups, field) => {
    if (!groups.some((item) => item.id === field.group!)) {
      let group = field.group!;
      let visible;
      if (typeof field.group === 'boolean') {
        group = field.name;
        visible = field.visible;
      }
      groups.push({
        id: group as string,
        name: group as string,
        visible,
      });
    }
    return groups;
  }, sourceGroups);
  const customTabs = customizer.tabs || [];
  if (!customTabs.length) {
    customTabs.push({
      name: '组件设置',
      groups: groups,
    });
  } else {
    for (const tab of customTabs) {
      tab.groups = groups.filter(({ id }) => (tab.groups as string[]).some((g) => g === id || (g as any).id === id));
    }
  }

  tabs.push(
    ...customTabs.map((item) => {
      const groups = item.groups as IFieldGroup[];
      const groupIds = groups.map(({ id }) => id);
      return {
        ...item,
        title: item.name,
        customizer: {
          groups,
          fields: fields.filter((field) => groupIds.includes(field.group! as string)),
        },
      };
    })
  );
  return tabs.map(createTabPane);
}
