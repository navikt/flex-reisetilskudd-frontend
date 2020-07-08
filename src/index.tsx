import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import env from './utils/environment';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

const frontendloggerSrc = () => {
  if (env.isQ1 || env.isProd) {
    return '/frontendlogger/logger.js';
  }
  return '/dev-frontendlogger.js';
};

const src = frontendloggerSrc();
const script = document.createElement('script');
script.src = src;
script.async = true;
document.body.appendChild(script);

serviceWorker.unregister();
