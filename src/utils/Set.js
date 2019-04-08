

const _list = ['default']
const _errorMessage = {
    NotNull: ({name='unknown'}={}) => `The ${name} must not be null`
}

export default ({
        list = _list,
        error = () => Error.throw(_errorMessage.NotNull({name:'list'})),
    } = {}) => {

    let result = {};

    list.forEach((e,i)=>{
        if(result[e]) error();
        result[e] = i;
    })

    return result;
}