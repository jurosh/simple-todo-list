import { AppRegistry } from 'react-native';
import { Router } from './components/Router';

import api from './api';
api();

AppRegistry.registerComponent('ToptalAcademy', () => Router);
