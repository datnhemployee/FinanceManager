import Icon from "../styles/Icon";
const NavigationIndex = {
    home: 0,
    total: 1,
    add: 2,
    expenditure: 3,
    debt: 4,
}

const defaultNavigation = {
    [NavigationIndex.home]: Icon.Home,
    [NavigationIndex.total]: Icon.Total,
    [NavigationIndex.add]: Icon.Add,
    [NavigationIndex.expenditure]: Icon.Expenditure,
    [NavigationIndex.debt]: Icon.Debt,
}

const defaultTabs = [
        ...[
            defaultNavigation[NavigationIndex.home]({isTapped: true}),
        ],
        ...Object.keys(defaultNavigation).splice(1).map((val)=>
        defaultNavigation[val]({isTapped: false}))
    ]

const getNavigatedTabs = ({
    index = 0,
    tabs = defaultTabs.slice(),
}={}) => {
    tabs[0] = defaultNavigation[NavigationIndex.home]({isTapped: false});
    tabs[index] = defaultNavigation[index]({isTapped: true});
    return tabs.slice();
}

export {
    NavigationIndex as Index,
    defaultTabs as Tabs,
    getNavigatedTabs,
}