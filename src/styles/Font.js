
const Font = {
    Roboro: {
        Regular: 'Roboto',
        Medium: 'Roboto-Medium',
        Light: 'Roboto-Light',
    },
    UVF: {
        Verner: 'UVF Verner',
    }
}

const Typeface = {
    overline: {
        fontWeight: 'bold',
        fontSize: 10,
        letterSpacing: 1.5,
        fontFamily: Font.Roboro.Regular,
    },
    caption: {
        fontSize: 12,
        letterSpacing: 0.4,
        fontFamily: Font.Roboro.Regular,
    },
    button: {
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1.25,
        fontFamily: Font.Roboro.Medium,
    },
    body: {
        1: {
            fontWeight: 'bold',
            fontSize: 16,
            letterSpacing: 0.25,
            fontFamily: Font.Roboro.Regular,
        },
        2: {
            fontSize: 14,
            letterSpacing: 0.5,
            fontFamily: Font.Roboro.Regular,
        },
    },
    subtitle: {
        1: {
            fontSize: 16,
            letterSpacing: 0.15,
            fontFamily: Font.Roboro.Regular,
        },
        2: {
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: 0.1,
            fontFamily: Font.Roboro.Medium,
        },
    },
    header: {
        1: {
            fontWeight: 'bold',
            fontSize: 96,
            letterSpacing: -1.5,
            fontFamily: Font.Roboro.Light,
        },
        2: {
            fontSize: 60,
            letterSpacing: -0.5,
            fontFamily: Font.Roboro.Light,
        },
        3: {
            fontWeight: 'bold',
            fontSize: 48,
            letterSpacing: 0,
            fontFamily: Font.Roboro.Regular,
        },
        4: {
            fontWeight: 'bold',
            fontSize: 34,
            letterSpacing: 0.25,
            fontFamily: Font.Roboro.Regular,
        },
        5: {
            fontSize: 24,
            letterSpacing: 0,
            fontFamily: Font.Roboro.Regular,
            },
        6: {
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: 0.15,
            fontFamily: Font.Roboro.Medium,
        },
    },
    type: {
        overline: 1,
        button: 2,
        default: 3,
    },
    
}
const toUpperCase = ({text=''}={}) => text.toUpperCase();

Typeface.toCase = ({
    text='',
    type= Typeface.type.default,
}={}) => {
    let result = text.slice();
    let transform = {
        [Typeface.type.overline]: toUpperCase,
        [Typeface.type.button]: toUpperCase,
    }
    if(!transform[type])
        return text.slice();
    return transform[type]({text: result});
}

export default Typeface;
export {
    Font,
}