/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PickType from '../FinanceManager/src/view/screen/PickType/PickType';
import ChooseType from '../FinanceManager/src/view/screen/ChooseType/ChooseType'

AppRegistry.registerComponent(appName, () => ChooseType);
