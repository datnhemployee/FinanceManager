const Error = {
    throw(message) {
        let err = new Error(message);
        throw new Error(
            '\nError: ' + err.message + 
            '\nstack trace: ' + err.stack
        )
    }
}
export default class {
    constructor (
        version = 0.1,
        author = 'unnamed',
        ) {
        this.props = {
            list: {},
            version: version,
            author: author,
        };
    }

    get version () {return this.props.version}
    get author () {return this.props.author}

    register(name) {
        if(!this.props.list[name]){
            this.props.list[name] = name;
        } else {
            Error.throw('The registered name is valid.');
        }
    }

    get(name) {
        if(!this.props.list[name]){
            return name;
        } else {
            Error.throw(
                ' The '+ name +
                ' is not a function.'
            );
        }

    }

    list() {
        return this.props.list;}
}