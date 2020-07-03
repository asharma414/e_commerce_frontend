import React, { Component } from 'react'

export default class ArtDetail extends Component {

    state = {
        artifact: {}
    }

    componentDidMount() {
        fetch(`http://localhost:3000/artifacts/${this.props.id}`)
        .then(res => res.json())
        .then(data => this.setState({artifact: data}))
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
