import React, { useState } from 'react';
import { LoginComp } from './components/LoginComp';
import { MainComp } from './components/MainComp';
import { HeaderComp } from './components/HeaderComp';
import "../src/scss/page-style.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from './views/LoginPage';
import { NoLoginPage } from './views/NoLoginPage';
import { ViewRecordsPage } from './views/ViewRecordsPage';
import LoggedPage from './views/LoggedPage';
import NotificationComp from './components/NotificationComp';

function App() {

  return (
    <>
      <div className="bg">   
          <BrowserRouter>
          {/* Header component above all other pages */}
          <HeaderComp />
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/LoggedIn" component={LoggedPage} />
              <Route path="/noLogin" component={NoLoginPage} />
              <Route path="/myData" component={ViewRecordsPage} />
            </Switch>
          </BrowserRouter>
        {/* Notification component is always below every other page */}
        <NotificationComp />
      </div>
    </>
  );
}

export default App;
