import React from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage'

const HatPage = () => (
  <div>
    <h1 style={{textAlign: "center", display: "flex-end"}}>hello</h1>
  </div>
)


function App() {
  return (
    <div>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={HatPage} />
    </Switch>
    </div>

  );
}

export default App;
