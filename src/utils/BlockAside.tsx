import React, { useContext, useRef } from 'react';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { ICustomizer, IFieldGroup } from 'sunmao';

import CurrentElementInformation from '../properties/CurrentElementInformation';
import DynaActionForm from '../properties/DynaActionForm';
import { AsideTabPane, DEFAULT_GROUP_ID } from '../typings';

export const DynaActionFormContext = React.createContext<any>({});

export function createDynaActionForm(customizer: ICustomizer, namespace: string = 'cn.asany.ui.editor.properties') {
  return ({ onChange: handleChange }: any) => {
    const container = useRef<HTMLDivElement>(null);
    const value = useContext(DynaActionFormContext);

    return (
      <div ref={container} className="sketch-configuration-body scrollbars-visible">
        <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'scroll' } }}>
          <DynaActionForm library={namespace} value={value} onChange={handleChange} customizer={customizer!} />
        </OverlayScrollbarsComponent>
      </div>
    );
  };
}

const createTabPane = (item: any, namespace?: string): AsideTabPane => ({
  title: item.name,
  visible: item.visible,
  content: createDynaActionForm(item.customizer, namespace),
});

export function buildAside(customizer: ICustomizer, namespace?: string) {
  const tabs = [];

  const fields = customizer.fields.map((item) => (item.group ? item : { ...item, group: DEFAULT_GROUP_ID }));
  const sourceGroups = [...(customizer.groups || [])];

  if (customizer.frame) {
    fields.unshift({
      name: 'rect',
      group: 'DEFAULT-rect',
      renderer: CurrentElementInformation,
      type: 'JSON',
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

  return tabs.map((tab) => createTabPane(tab, namespace));
}
