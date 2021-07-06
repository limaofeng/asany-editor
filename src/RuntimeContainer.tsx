import React from 'react';

// import { useEnvSelector } from '../environment-manager';

interface RuntimeContainerProps {
  children: React.ReactElement;
}

function RuntimeContainer({ children, ...props }: RuntimeContainerProps) {
  // const route = useEnvSelector((state) => state.routing.route);
  // const location = useEnvSelector((state) => state.routing.location);
  return React.cloneElement(React.Children.only(children), { ...props });
}

export default RuntimeContainer;
