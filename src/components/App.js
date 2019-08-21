import React from 'react';
import LinkList from './LinkList';
import { Switch, Route } from 'react-router-dom'



function App() {
  return (
    <div className="center w85">
        <Switch>
          <Route exact path="/" component={LinkList} />
        </Switch>
    </div>
  );
}

export default App;
