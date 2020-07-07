import React, { Component } from 'react';
import './App.css';
import ArtContainer from './components/ArtContainer'
import SideBar from './components/SideBar'
import ArtDetail from './components/ArtDetail'
import { Grid, Segment, Loader, Dimmer, Image } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



export default class App extends Component {

  state = {
    artifacts: [],
    searchField: '',
    categories: [],
    filteredCategories: [],
    priceFilter: '10000-10000000',
    checked: {}
  }


  componentDidMount() {
    // let params = '?'
    // this.state.filteredCategories.forEach(cat => params+=`category[${this.state.filteredCategories.indexOf(cat)}]=${cat.replace(/\s/g, "%20")}&`)
    fetch('http://localhost:3000/artifacts')
      .then(res => res.json())
      .then(artifacts => {
        fetch('http://localhost:3000/categories')
          .then(r => r.json())
          .then(categories => {
            let cat_boolean = {}
            categories.map(category => cat_boolean[`${category.name}`] = false)
            let catArr = categories.map(category => category.name)
            this.setState({ artifacts: artifacts, categories: categories, checked: cat_boolean })
          })
      }
      )
  }



  // categoryFilter = (arr) => {
  //   let params = '?'
  //   arr.forEach(cat => params+=`category[${this.state.filteredCategories.indexOf(cat)}]=${cat.replace(/\s/g, "%20")}&`)
  //   fetch(`http://localhost:3000/artifacts${params}`)
  //   .then(res => res.json())
  //   .then(data => this.setState({artifacts: data}))
  // }


  toggleCategory = (e) => {
    let categoryArr = []
    let array = Object.entries(this.state.checked).map(category => category[0] === e.target.innerText ? [category[0], !category[1]] : [category[0], category[1]])
    if (this.state.checked[`${e.target.innerText}`]) {
      categoryArr = this.state.filteredCategories.filter(cat => cat != e.target.innerText)
      this.setState({ checked: Object.fromEntries(array), filteredCategories: categoryArr })
    } else {
      categoryArr = [...this.state.filteredCategories, e.target.innerText]
      this.setState({ checked: Object.fromEntries(array), filteredCategories: categoryArr })
    }
    // this.categoryFilter(categoryArr)
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  setPriceFilter = (value) => {
    this.setState({ priceFilter: value })
  }

  filter = () => {
    let filteredbyCat
    if (this.state.filteredCategories.length === 0) {
      filteredbyCat = this.state.artifacts
    } else {
      filteredbyCat = this.state.artifacts.filter(artifact => this.state.filteredCategories.includes(artifact.category.name))
    }
    return filteredbyCat.filter(artifact => parseFloat(artifact.list_price) >= parseFloat(this.state.priceFilter.split('-')[0]) && parseFloat(artifact.list_price) <= parseFloat(this.state.priceFilter.split('-')[1]))
  }

  render() {

    return (

      <Router>
        <Grid style={{ marginTop: '10px', marginRight: '-600px' }} columns={2}>
          <Grid.Column style={{ width: '15%' }}>
            <Route path='/' render={() =>
              <SideBar
                categories={this.state.categories}
                handleChange={this.changeSearchField}
                handlePrice={this.setPriceFilter}
                handleCategories={this.categoryFilter}
                checked={this.state.checked}
                toggleCategory={this.toggleCategory}
              />} />
          </Grid.Column>
          <Switch>
            <Route exact path='/artifacts' render={() =>
              this.state.artifacts.length === 0 ?
                <Grid.Column style={{ marginLeft: '50px' }}>
                  <Segment>
                    <Dimmer active inverted>
                      <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                  </Segment>
                </Grid.Column>
                :
                <Grid.Column style={{ marginLeft: '50px' }}>
                  <ArtContainer style={{ width: '85%' }} artifacts={this.filter()} searchField={this.state.searchField} />
                </Grid.Column>} />
            <Route exact path='/artifacts/:id' render={(props) => 
            <Grid.Column><ArtDetail style={{ width: '75%' }} id={props.match.params.id} /></Grid.Column>} />
          </Switch>
        </Grid>
      </Router>
    );
  }
}
