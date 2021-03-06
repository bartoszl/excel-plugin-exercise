import "office-ui-fabric-react/dist/css/fabric.min.css";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reducer from './rootReducer';
import theme from './theme';

initializeIcons();

let isOfficeInitialized = false;

const title = "Contoso Task Pane Add-in";

const store = createStore(reducer, applyMiddleware(thunk));

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
  }
`

const render = Component => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Provider store={store}>
          <App title={title} isOfficeInitialized={isOfficeInitialized} />
        </Provider>
      </AppContainer>
      <GlobalStyle />
    </ThemeProvider>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

/* Initial render showing a progress bar */
render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
