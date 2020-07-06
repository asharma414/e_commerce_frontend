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
    categories: [],
    filteredArtifacts: [],
    filteredCategories: ['Architectural Elements', 'Drawings']
  }

  
  componentDidMount() {
    fetch('http://localhost:3000/artifacts')
      .then(res => res.json())
      .then(artifacts => {
        fetch('http://localhost:3000/categories')
          .then(r => r.json())
          .then(categories => this.setState({artifacts: artifacts, filteredArtifacts: artifacts, categories: categories}))
      }
      )
  }

  categoryFilter = (category) => {
    let params = '?'
    this.state.filteredCategories.forEach(cat => params+=`category[${this.state.filteredCategories.indexOf(cat)}]=${cat.replace(/\s/g, "%20")}&`)
    fetch(`http://localhost:3000/artifacts/category${params}`)
    .then(res => res.json())
    .then(data => console.log(data))
    
   
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  filterPrice = (value) => {
      let filteredArr = this.state.artifacts.filter(artifact => parseFloat(artifact.list_price) >= parseFloat(value.split('-')[0]) && parseFloat(artifact.list_price) <= parseFloat(value.split('-')[1]))
      this.setState({filteredArtifacts: filteredArr})
  }

  render() {
  
    return (
      
      <Router>
        <Grid style={{marginTop: '10px', marginRight: '-500px'}} columns={2}>
          <Grid.Column style={{width: '15%'}}>
          <SideBar
          categories={this.state.categories} 
          handleChange={this.changeSearchField}
          handlePrice={this.filterPrice}
          handleCategories={this.categoryFilter}
          />
          </Grid.Column>
          <Switch>
            <Route exact path='/artifacts' render={(props) =>             
            <Grid.Column>
              <ArtContainer style={{width: '85%'}} history={props.history} artifacts={this.state.filteredArtifacts} searchField={this.state.searchField} />
            </Grid.Column>} />
            <Route exact path='/artifacts/:id' render={(props) => <Grid.Column><ArtDetail style={{width: '75%'}} id={props.match.params.id} /></Grid.Column>}/>
          </Switch>
        </Grid>
      </Router>
    );
  }
}
