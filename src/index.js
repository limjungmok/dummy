import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducers from './reducers';
import App from './routes/container/App';

import './public/scss/app.scss';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
