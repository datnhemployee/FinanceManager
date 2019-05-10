import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import PickType from "../FinanceManager/src/view/screen/PickType/PickType";

AppRegistry.registerComponent(appName, () => PickType);
