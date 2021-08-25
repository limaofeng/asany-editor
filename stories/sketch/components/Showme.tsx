import React, { useEffect } from 'react';
import { useBlock } from 'sunmao';
import { ComponentPropertyType } from 'sunmao';

function Showme() {
  const { key, props, update, Provider } = useBlock({
    key: 'xxx',
    icon: '',
    title: '',
    props: {
      title: 'xxx',
    },
    customizer: {
      fields: [
        {
          name: 'title',
          type: ComponentPropertyType.String,
        },
      ],
    },
  });

  console.log('>>>>>', props.title);

  return (
    <Provider style={{ flex: 1 }} clickable>
      Show me your code: {props.title} <br /> key = {key}
    </Provider>
  );
}

export default Showme;
