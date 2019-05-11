import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './Redusers/reducer';
import { Provider } from 'react-redux';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import am from 'react-intl/locale-data/am';

import './index.css';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import * as serviceWorker from './serviceWorker';

addLocaleData(en);
addLocaleData(am);
const store = createStore(reducer);

ReactDOM.render(
<Provider store = {store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
