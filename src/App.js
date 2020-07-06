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
    filteredCategories: [],
    checked: {}
  }

  
  componentDidMount() {

    fetch('http://localhost:3000/artifacts')
      .then(res => res.json())
      .then(artifacts => {
        fetch('http://localhost:3000/categories')
          .then(r => r.json())
          .then(categories => {
            let cat_boolean = {}
            categories.map(category => cat_boolean[`${category.name}`] = false)
            this.setState({artifacts: artifacts, filteredArtifacts: artifacts, categories: categories, checked: cat_boolean})
        })
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

  toggleCategory = (e) => {
    let array = Object.entries(this.state.checked).map(category => category[0] === e.target.innerText ? [category[0], true] : [category[0], category[1]])
    // console.log(Object.fromEntries(array))
    this.setState({checked: Object.fromEntries(array)})
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
          checked={this.state.checked}
          toggleCategory={this.toggleCategory}
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
