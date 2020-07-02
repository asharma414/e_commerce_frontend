import React, { Component } from 'react'
import ItemCard from './ItemCard'
import { Card } from 'semantic-ui-react'

export default class Container extends Component {

    state = {
        artifacts: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/artifacts')
        .then(res => res.json())
        .then(data => this.setState({artifacts: data}))
    }

    render() {
        return (
            <Card.Group>
                {this.state.artifacts.map(artifact => <ItemCard key={artifact.id} artifact={artifact} />)}
            </Card.Group>
        )
    }
}
