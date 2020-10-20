/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Axios from 'axios';
import config from './app';

Axios.defaults.baseURL = config.apiUrl;
Axios.defaults.timeout = 5000;
AppRegistry.registerComponent(appName, () => App);
