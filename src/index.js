import React from 'react';
import { render } from 'react-dom';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';

import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import AWS_EXPORTS from './aws-exports';
import 'semantic-ui-css/semantic.min.css';
import './global.css';
import configureStore from './store';

require('dotenv').config()

const store = configureStore();

Amplify.configure(AWS_EXPORTS);

const renderApp = () => render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./routes', renderApp);
}

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
