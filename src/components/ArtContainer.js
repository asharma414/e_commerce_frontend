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
            <Grid columns={4} relaxed style={{paddingRight: 0}}>
                {filteredArt.map(artifact => 
                <Grid.Column><ArtCard history={this.props.history} key={artifact.id} artifact={artifact} /></Grid.Column>)}
            </Grid>
            </div>
        )
    }
}
