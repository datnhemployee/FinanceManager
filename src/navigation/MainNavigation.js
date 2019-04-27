import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import Typeface from "../styles/Font";
import Color from "../styles/Color";
import Note from "../view/screen/Note/Note";

const AddStack = createSwitchNavigator({
    Note: {
        screen: Note,
    },
    Detail:  {
        screen: Note,
    },
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

const NoteNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: Typeface.toCase({
                text: 'Thêm giao dịch',
                type: Typeface.type.default,
            }),
       }
    },
    AddStack: {
        screen: AddStack,
        navigationOptions: {
            title: Typeface.toCase({
                text: 'Chi tiết',
                type: Typeface.type.default,
            }),
       }
    }
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