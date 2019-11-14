import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { setConfig } from 'react-hot-loader';
import { App } from './containers/App';
import { patchLogs } from './patchLogs';

const BrowserFS = require('browserfs');

import { configure } from 'mobx';
import './styleReset.css';

configure({
  enforceActions: 'observed'
});

setConfig({ trackTailUpdates: false });

// browserFS setting
BrowserFS.install(window);
BrowserFS.configure({ fs: 'InMemory' }, function(err) {
  if (err) throw err;
  // console.log('ye', BrowserFS);
});

patchLogs();
moment.locale('ru');

render(<App />, document.getElementById('root'));
