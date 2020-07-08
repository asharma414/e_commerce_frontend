import React, { Component } from 'react'
import ArtCard from './ArtCard'
import { Container, Grid, Pagination } from 'semantic-ui-react'

// export default class ArtContainer extends Component {

//     render() {
//         let filteredArt = this.props.artifacts.filter(
//             (art) => art.title.toLowerCase().includes(this.props.searchField.toLowerCase())
//         )
//         if (this.props.artifacts.length > 0) {
//             return (
//                 <Grid columns={4} relaxed style={{paddingRight: 0}}>
//                     {filteredArt.map(artifact => 
//                     <Grid.Column mobile={16} tablet={8} computer={4}><ArtCard key={artifact.id} artifact={artifact} /></Grid.Column>)}
//                 </Grid>
//             )
//         } else {
//             return (
//                 <div>No Results Found</div>
//             )
//         }

//     }
// }

export default function ArtContainer(props) {
    let filteredArt = props.artifacts.filter(
        (art) => art.title.toLowerCase().includes(props.searchField.toLowerCase())
    )
    if (props.artifacts.length > 0) {
        return (
            <Container>
            <Grid columns={4} relaxed style={{paddingRight: 0}}>
                {filteredArt.map(artifact => 
                <Grid.Column mobile={16} tablet={8} computer={4}><ArtCard key={artifact.id} artifact={artifact} /></Grid.Column>)}
            </Grid>
           {/* <Pagination defaultActivePage={5} totalPages={10}/> */}
           </Container>
        )
    } else {
        return (
            <div>No Results Found</div>
        )
    }
}

