import "react-native-gesture-handler"
import App from "./App"
import { AppRegistry } from "react-native"
import {name as AppName} from "./app.json"

AppRegistry.registerComponent(AppName,()=>App);