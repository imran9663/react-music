import React, { Component } from 'react'

export class Dummy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name
        }
    }
    render() {
        return (
            <div>Dummy</div>
        )
    }
}

export default Dummy