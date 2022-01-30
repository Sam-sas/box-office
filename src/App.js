import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Starred from './pages/Starred';

function App() {

  return (
    <>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/starred" component={Starred} />
      <Route component={NotFound} />
    </Switch>
    </>
   
  );
}

export default App;
