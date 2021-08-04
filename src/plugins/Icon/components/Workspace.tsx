import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import LibraryDetails from './LibraryDetails';

import MyLibraries from './MyLibraries';

function Workspace() {
  let location = useLocation();
  React.useEffect(() => {
    console.log('pageview', location.pathname);
  }, [location]);
  return (
    <Switch>
      <Route exact path="/iframe.html">
        <MyLibraries />
      </Route>
      <Route path="/libraries/:id">
        <LibraryDetails />
      </Route>
      <Route path="/dashboard">
        <MyLibraries />
      </Route>
    </Switch>
  );

  // return (
  //   <div
  //     style={{
  //       height: '100%',
  //       width: '100%',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       color: '#727d83',
  //       fontSize: 18,
  //       paddingTop: 20,
  //     }}
  //   >
  //     <div style={{ textAlign: 'center' }}>
  //       工作区
  //       <div style={{ fontSize: 12, paddingTop: 10 }}>点击工作区，可以唤出属性配置面板</div>
  //     </div>
  //   </div>
  // );
}

export default Workspace;
