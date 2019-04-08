
export default class RenderSet {

    static default () {
        return {
            Header: 1,
            Body: 2,
            Footer: 3,
        }
    }

    constructor () { 
        this.props = {
            nextIndex: 4,
            author: 'unknown',
        }
    }

    publishedBy ({
        author=this.props.author,
    }={}) {
        this.props.author={
            ...author
        }
    }
    
    next () {
        return this.props.nextIndex++;
    }
}