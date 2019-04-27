const Default = {
    DarkGreen: '#1faa00',
    LightGreen: 'rgb(123, 237, 159)',
    Red: 'rgb(255, 71, 87)',
    Blue: 'rgb(30, 144, 255)',
    Black: 'black',
    White: 'white',
    Gray: '#e0e0e0',
    LightGray: '#f5f5f5',
}

const Navigation = {
    tap: Default.Black,
    untapped: Default.Gray,
}

export default {
    ...Default,
    Navigation,
}
