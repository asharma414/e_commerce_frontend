import React, { Component } from 'react'
import ArtCard from './ArtCard'
import Pagination from './Pagination'
import {Grid} from 'semantic-ui-react'

export default class ArtContainer extends Component {

    state = {
        artifactsPerPage: 20,
        currentPage: 1
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    render() {
        let filteredArt = this.props.artifacts.filter(
            (art) => art.title.toLowerCase().includes(this.props.searchField.toLowerCase())
        )
        const indexOfLastArtifact = this.state.currentPage * this.state.artifactsPerPage;
        const indexOfFirstArtifact = indexOfLastArtifact - this.state.artifactsPerPage;
        const currentArtifacts = filteredArt.slice(indexOfFirstArtifact, indexOfLastArtifact)
        if (this.props.artifacts.length > 0) {
            return (
                <div>
                    <Grid columns={4} relaxed style={{ paddingRight: 0 }}>
                        {currentArtifacts.map(artifact =>
                            <Grid.Column mobile={16} tablet={8} computer={4}><ArtCard key={artifact.id} artifact={artifact} /></Grid.Column>)}
                    </Grid>
                    <br/>
                    <br/>
                    <Pagination artifactsPerPage={this.state.artifactsPerPage} totalArtifacts={this.props.artifacts.length} currentPage={this.state.currentPage} paginate={this.paginate} />
                </div>
            )
        } else {
            return (
                <div style={{ textAlign: 'center', color: '#a8a7b9' }}>No Results Found</div>
            )
        }

    }
}

// export default function ArtContainer(props) {


//     let filteredArt = props.artifacts.filter(
//         (art) => art.title.toLowerCase().includes(props.searchField.toLowerCase())
//     )
//     if (props.artifacts.length > 0) {
//         return (
//             <Container>
//             <Grid columns={4} relaxed style={{paddingRight: 0}}>
//                 {filteredArt.map(artifact => 
//                 <Grid.Column mobile={16} tablet={8} computer={4}><ArtCard key={artifact.id} artifact={artifact} /></Grid.Column>)}
//             </Grid>
//            {/* <Pagination defaultActivePage={5} totalPages={10}/> */}
//            </Container>
//         )
//     } else {
//         return (
//             <div>No Results Found</div>
//         )
//     }
// }

