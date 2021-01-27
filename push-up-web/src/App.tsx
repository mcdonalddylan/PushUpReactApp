import React, { useState } from 'react';
import { LoginComp } from './components/LoginComp';
import "../src/scss/page-style.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import { NoLoginPage } from './views/NoLoginPage';
import { ViewRecordsPage } from './views/ViewRecordsPage';
import LoggedPage from './views/LoggedPage';
import NotificationComp from './components/NotificationComp';
import UserSettingsPage from './views/UserSettingsPage';
import HeaderComp from './components/HeaderComp';

function App() {

  return (
    <>
      <div className="bg">   
          <BrowserRouter>
          {/* Header component above all other pages */}
          <HeaderComp />
          {/* Notification component is always above every other page */}
          <NotificationComp />
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/loggedIn" component={LoggedPage} />
              <Route path="/userSettings" component={UserSettingsPage} />
              <Route path="/noLogin" component={NoLoginPage} />
              <Route path="/myData" component={ViewRecordsPage} />
            </Switch>
          </BrowserRouter>
        
      </div>
    </>
  );
}

export default App;
