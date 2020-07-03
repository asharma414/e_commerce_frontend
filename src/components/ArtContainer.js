import React, { Component } from 'react'
import ArtCard from './ArtCard'
import { Grid } from 'semantic-ui-react'

export default class ArtContainer extends Component {

    render() {
        let filteredArt = this.props.artifacts.filter(
            (art) => art.title.toLowerCase().includes(this.props.searchField.toLowerCase())
        )
        return (
            <div>
            <Grid columns={3} relaxed divided>
                {filteredArt.map(artifact => 
                <Grid.Column><ArtCard key={artifact.id} artifact={artifact} /></Grid.Column>)}
            </Grid>
            </div>
        )
    }
}
