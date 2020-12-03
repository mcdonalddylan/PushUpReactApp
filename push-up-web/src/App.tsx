import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginComp } from './components/LoginComp';
import { MainComp } from './components/MainComp';
import { HeaderComp } from './components/HeaderComp';

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
