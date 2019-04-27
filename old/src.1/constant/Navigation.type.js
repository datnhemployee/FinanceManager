import Icon from "../styles/Icon";
const NavigationIndex = {
    note: 0,
    notebook: 1,
}

const defaultNavigation = {
    [NavigationIndex.note]: Icon.Note,
    [NavigationIndex.notebook]: Icon.Notebook,
}

const defaultTabs = [
        ...[
            defaultNavigation[NavigationIndex.note]({isTapped: true}),
        ],
        ...Object.keys(defaultNavigation).splice(1).map((val)=>
        defaultNavigation[val]({isTapped: false}))
    ]

const getNavigatedTabs = ({
    index = 0,
    tabs = defaultTabs.slice(),
}={}) => {
    tabs[0] = defaultNavigation[NavigationIndex.note]({isTapped: false});
    tabs[index] = defaultNavigation[index]({isTapped: true});
    return tabs.slice();
}

export {
    NavigationIndex as Index,
    defaultTabs as Tabs,
    getNavigatedTabs,
}