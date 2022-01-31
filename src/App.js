import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Show from './pages/Show';
import Starred from './pages/Starred';
import { ThemeProvider } from 'styled-components';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {

  return (
    <ThemeProvider theme={theme}>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/starred" component={Starred} />
      {/* dynamic Route */}
      <Route exact path="/show/:id" component={Show} />
      <Route component={NotFound} />
    </Switch>
    </ThemeProvider>
   
  );
}

export default App;
