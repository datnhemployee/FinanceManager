class RBG {
    constructor (r = 0,b = 0,g = 0) {
        this._r = r;
        this._b = b;
        this._g = g;
    }
    get R () {return this._r}
    get B () {return this._b}
    get G () {return this._g}
    toColor () { 
        return `rbg(${this._r},${this._b},${this._g})`;
    }
}
const RBGColor = {
    DarkGreen: new RBG(31,170,0),
    LightGreen: new RBG(123,237,159),
    Red: new RBG(255,71,87),
    Blue: new RBG(30,144,255),
    Black: new RBG(0,0,0),
    White: new RBG(255,255,255),
    Gray: new RBG(117,117,117),
}
const Default = {
    DarkGreen: 'rgb(31, 170, 0)',
    LightGreen: 'rgb(123, 237, 159)',
    Red: 'rgb(255, 71, 87)',
    Blue: 'rgb(30, 144, 255)',
    Black:'rgb(0, 0, 0)',
    White: 'rgb(255, 255, 255)',
    Gray: 'rgb(117, 117, 117)',
}

export default {
    ...Default,
}

export {
    RBGColor,
}
