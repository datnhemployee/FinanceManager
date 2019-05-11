import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ChooseType from './src/view/screen/ChooseType/ChooseType'

AppRegistry.registerComponent(appName, () => ChooseType);
