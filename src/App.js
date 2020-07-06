import React, {Component} from 'react';
import './App.css';
import ArtContainer from './components/ArtContainer'
import SideBar from './components/SideBar'
import ArtDetail from './components/ArtDetail'
import { Grid } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



export default class App extends Component {

  state = {
    artifacts: [],
    searchField: '',
    filteredArtifacts: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/artifacts')
      .then(res => res.json())
      .then(data => this.setState({artifacts: data, filteredArtifacts: data}))
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  filterPrice = (e) => {
    debugger
    // console.log(e.currentTarget.innerText.replace(/K/g, "000").replace(/M/g, "000000"))
    let filteredArr = this.state.artifacts.filter(artifact => artifact.list_price >= e.currentTarget.innerText.replace(/K/g, "000").replace(/M/g, "000000").split(' - ')[0] && 
    artifact.list_price <= e.currentTarget.innerText.replace(/K/g, "000").replace(/M/g, "000000").split(' - ')[1])
    this.setState({filteredArtifacts: filteredArr})
    
  }

  render() {
  
    return (
      
      <Router>
        <Grid style ={{marginTop: '10px'}} columns={2}>
          <Grid.Column style={{width: '25%'}}>
          <SideBar 
          handleChange={this.changeSearchField}
          handlePrice={this.filterPrice}
          />
          </Grid.Column>
          <Switch>
            <Route exact path='/artifacts' render={(props) =>             
            <Grid.Column>
              <ArtContainer style={{width: '75%'}} history={props.history} artifacts={this.state.filteredArtifacts} searchField={this.state.searchField} />
            </Grid.Column>} />
            <Route exact path='/artifacts/:id' render={(props) => <Grid.Column><ArtDetail style={{width: '75%'}} id={props.match.params.id} /></Grid.Column>}/>
          </Switch>
        </Grid>
      </Router>
    );
  }
}


// $('.autumn.leaf')
//   .transition('slide left')
// ;

// $('.autumn.leaf')
//   .transition('slide right')
// ;
