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
    searchField: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/artifacts')
      .then(res => res.json())
      .then(data => this.setState({ artifacts: data }))
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render() {

    return (
      <Router>
        <Grid style ={{'margin-top': '10px'}} columns={2}>
          <Grid.Column style={{width: '25%'}}>
          <SideBar handleChange={this.changeSearchField}/>
          </Grid.Column>
          <Switch>
            <Route exact path='/artifacts' render={(props) =>             
            <Grid.Column>
              <ArtContainer style={{width: '75%'}} history={props.history} artifacts={this.state.artifacts} searchField={this.state.searchField} />
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
