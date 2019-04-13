import { createMaterialTopTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import Typeface from "../styles/Font";
import Color from "../styles/Color";
import Home from "../view/screen/Home/Home";
import Note from "../view/screen/Note/Note";

const RemovingStack = createSwitchNavigator({
    Home: {
        screen: Home,
    },
    Note: Note,
},{
    initialRouteName: 'Note',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

// muốn còn header thì tắt cái này đi
RemovingStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    console.log(JSON.stringify(navigation))
    if (navigation.state.index < 1) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
};

const NoteNavigator = createMaterialTopTabNavigator({
    Note: {
        screen: RemovingStack,
        navigationOptions: {
            title: Typeface.toCase({
                text: 'Ghi chú',
                type: Typeface.type.default,
            }),
        }
    },
    Bill: {
        screen: Note,
        navigationOptions: {
            title: Typeface.toCase({
                text: 'Hóa đơn',
                type: Typeface.type.default,
            }),
       }
    },
    // Bill: Bill,
},{
    initialRouteName: 'Note',
    tabBarOptions: {
        labelStyle: {
            ...Typeface.header[6],
        },
        style: {
            backgroundColor: Color.White,
            elevation: 0,
            flex: 0,
            // borderBottomWidth: 1,
        },
        indicatorStyle: {
            backgroundColor: Color.White,
        },
        upperCaseLabel: false,
        activeTintColor: Color.DarkGreen,
        inactiveTintColor: Color.Gray,
    }
})



// export default createAppContainer(mainNavigator);
export default createAppContainer(NoteNavigator);