import React, { Component } from 'react'
import ArtCard from './ArtCard'
import { Card } from 'semantic-ui-react'

export default class ArtContainer extends Component {

    render() {
        let filteredArt = this.props.artifacts.filter(
            (art) => art.title.toLowerCase().includes(this.props.searchField.toLowerCase())
        )
        return (

            <Card.Group>
                {filteredArt.map(artifact => 
                <ArtCard key={artifact.id} artifact={artifact} />)}
            </Card.Group>
          
        )
    }
}
