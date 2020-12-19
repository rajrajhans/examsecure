import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./components/reducers";
import "tailwindcss/dist/base.css";
import { css } from "styled-components/macro";
import "./styles/bootstrapthemes.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); //todo: after setting up env vars, call redux devtools only in dev environment and not in prod

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
