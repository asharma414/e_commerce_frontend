import React, { Component } from 'react';
import './App.css';
import ArtContainer from './components/ArtContainer'
import SideBar from './components/SideBar'
import SideBarDetail from './components/SideBarDetail'
import ArtDetail from './components/ArtDetail'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import { Grid, Loader } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'



export default class App extends Component {

  state = {
    artifacts: [],
    searchField: '',
    categories: [],
    filteredCategories: [],
    priceFilter: '10000-10000000',
    checked: {},
    currentUser: null,
    admin: false
  }


  componentDidMount() {
    // let params = '?'
    // this.state.filteredCategories.forEach(cat => params+=`category[${this.state.filteredCategories.indexOf(cat)}]=${cat.replace(/\s/g, "%20")}&`)
    if (localStorage.getItem('id') && localStorage.getItem('admin')) {
      this.setState({ currentUser: localStorage.getItem('id'), admin: localStorage.getItem('admin') === 'true' ? true : false })
      this.fetchItems()
    }
  }

  fetchItems = () => {
    fetch('http://localhost:3000/artifacts')
    .then(res => res.json())
    .then(artifacts => {
      fetch('http://localhost:3000/categories')
        .then(r => r.json())
        .then(categories => {
          let cat_boolean = {}
          categories.map(category => cat_boolean[`${category.name}`] = false)
          this.setState({ artifacts: artifacts, categories: categories, checked: cat_boolean })
        })
    }
    )
  }

  logoutUser = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    this.setState({ currentUser: null, admin: false })
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
      categoryArr = this.state.filteredCategories.filter(cat => cat !== e.target.innerText)
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

  loginUser = (e, username, password) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
        localStorage.setItem('id', data.id)
        localStorage.setItem('admin', data.admin)
        this.setState({ currentUser: data.id })
        this.fetchItems()
      } else {
        alert(data.message)
      }
      })
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
        <Route path='/' render={() =>
          this.state.currentUser ? <Redirect to='/artifacts' /> : <Redirect to='/login' />
        } />
        <Route exact path='/login' render={() => <Login formSubmit={this.loginUser} user={this.loginUser} />} />
        <Route exact path='/register' render={() => <Register />} />
        <Switch>
          <Route exact path='/artifacts' render={() =>
            this.state.artifacts.length === 0 ?
              <Grid style={{ marginTop: '10px', marginRight: '-500px' }} columns={2}>
                <Grid.Column style={{ width: '15%' }}>
                  <SideBar
                    user={this.state.currentUser}
                    logout={this.logoutUser}
                    categories={this.state.categories}
                    handleChange={this.changeSearchField}
                    handlePrice={this.setPriceFilter}
                    handleCategories={this.categoryFilter}
                    checked={this.state.checked}
                    toggleCategory={this.toggleCategory}
                  />
                </Grid.Column>
                <Grid.Column style={{ marginLeft: '50px' }}>
                  <Loader active inline='centered' />
                  <div style={{ textAlign: 'center' }}>Loading</div>
                </Grid.Column>
              </Grid>

              :

              <Grid style={{ marginTop: '10px', marginRight: '-500px' }} columns={2}>
                <Grid.Column style={{ width: '15%' }}>
                  <SideBar
                    user={this.state.currentUser}
                    logout={this.logoutUser}
                    categories={this.state.categories}
                    handleChange={this.changeSearchField}
                    handlePrice={this.setPriceFilter}
                    handleCategories={this.categoryFilter}
                    checked={this.state.checked}
                    toggleCategory={this.toggleCategory}
                  />
                </Grid.Column>
                <Grid.Column style={{ marginLeft: '50px' }}>
                  <ArtContainer style={{ width: '85%' }} artifacts={this.filter()} searchField={this.state.searchField} />
                </Grid.Column>
              </Grid>} />

          <Route exact path='/artifacts/:id' render={(props) =>
            <Grid style={{ marginTop: '10px', marginRight: '-500px' }} columns={2}>
              <Grid.Column style={{ width: '15%' }}>
                <SideBarDetail
                  user={this.state.currentUser}
                  logout={this.logoutUser}
                  categories={this.state.categories}
                  handleChange={this.changeSearchField}
                  handlePrice={this.setPriceFilter}
                  handleCategories={this.categoryFilter}
                  checked={this.state.checked}
                  toggleCategory={this.toggleCategory}
                />
              </Grid.Column>
              <Grid.Column>
                <ArtDetail style={{ width: '75%' }} id={props.match.params.id} />
              </Grid.Column>
            </Grid>} />
        </Switch>
      </Router>
    );
  }
}
