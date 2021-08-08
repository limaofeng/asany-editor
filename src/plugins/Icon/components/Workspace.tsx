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
      <Route path="/asany-editor/iframe.html">
        <MyLibraries />
      </Route>
      <Route exact path="/iframe.html">
        <LibraryDetails />
      </Route>
      <Route path="/libraries/:id">
        <LibraryDetails />
      </Route>
      <Route path="/libraries">
        <MyLibraries />
      </Route>
    </Switch>
  );
}

export default Workspace;
