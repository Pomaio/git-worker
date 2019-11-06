import moment from 'moment';
import React from 'react';
import { render } from 'react-dom';
import { setConfig } from 'react-hot-loader';
import { App } from './containers/App';
import { patchLogs } from './patchLogs';

import { configure } from 'mobx';
import './styleReset.css';

configure({
  enforceActions: 'observed'
});

setConfig({ trackTailUpdates: false });

patchLogs();
moment.locale('ru');

render(<App />, document.getElementById('root'));
