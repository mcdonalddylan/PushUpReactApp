import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { IState } from './reducers/reduxInterfaces';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { notifReducer } from './reducers/notifReducer';
import { userReducer } from './reducers/userReducer';
import { loadState, saveState } from './util/sessionStorage';

const a: any = window;

const composeEnhancer =
  (a["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export const state = combineReducers<IState>({
  userState: userReducer,
  notifState: notifReducer,
});

//re-loads the state from the current session
const pressistedState = loadState();

const store = createStore(
  state,
  pressistedState,
  composeEnhancer(applyMiddleware(thunk))
);

//Every time a dispatch is called this state is stored in the session and then reloaded
store.subscribe(() => {
  saveState(store.getState());
});
  
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
