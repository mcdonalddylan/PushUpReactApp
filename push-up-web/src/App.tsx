import React from 'react';
import { LoginComp } from './components/LoginComp';
import { MainComp } from './components/MainComp';
import { HeaderComp } from './components/HeaderComp';
import "../src/scss/page-style.scss";

function App() {
  return (
    <>
      <div className="bg">
        <HeaderComp />
        {/* <LoginComp /> */}
        <MainComp />
      </div>
    </>
  );
}

export default App;
