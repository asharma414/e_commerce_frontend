import React, { Component } from 'react';
import './App.css';
import ArtContainer from './components/ArtContainer'
import SideBar from './components/SideBar'
import ArtDetail from './components/ArtDetail'
import Login from './components/Login'
import Cart from './components/Cart'
import UserProfile from './components/UserProfile'
import About from './components/About'
import { Loader } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'



export default class App extends Component {

  state = {
    artifacts: [],
    searchField: '',
    categories: [],
    filteredCategories: [],
    filteredVerifications: [],
    priceFilter: '10000-10000000',
    checkedCats: {},
    checkedVerifs: {},
    currentUser: null,
    admin: false,
    userName: null,
    address: '',
    cart: [],
    cartTotal: 0
  }

  componentDidMount() {
    // let params = '?'
    // this.state.filteredCategories.forEach(cat => params+=`category[${this.state.filteredCategories.indexOf(cat)}]=${cat.replace(/\s/g, "%20")}&`)
    if (localStorage.getItem('id') && localStorage.getItem('admin') && localStorage.getItem('name') && localStorage.getItem('address')) {
      this.setState({ currentUser: parseInt(localStorage.getItem('id')), admin: localStorage.getItem('admin') === 'true' ? true : false, userName: localStorage.getItem('name'), address: localStorage.getItem('address') })
      fetch(url + `/cart?user_id=${localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(data => {
          let total = data.reduce(function (acc, obj) { return acc + parseFloat(obj.total_price); }, 0);
          this.setState({ cart: data, cartTotal: total.toFixed(2) })
        })
      this.fetchItems()
    }
  }

  refreshIndex = (orders) => {
    let artifact_ids = orders.map(order => order.artifact_id)
    let updated = this.state.artifacts.filter(artifact => !artifact_ids.includes(artifact.id))
    this.setState({ artifacts: updated })
  }

  fetchItems = () => {
    fetch(url + '/artifacts')
      .then(res => res.json())
      .then(artifacts => {
        fetch(url + '/categories')
          .then(r => r.json())
          .then(categories => {
            let cat_boolean = {}
            categories.map(category => cat_boolean[`${category.name}`] = false)
            let verif_boolean = { 'unchecked': false, 'poor': false, 'adequate': false, 'good': false, 'best': false }
            this.setState({
              artifacts: artifacts, categories: categories, checkedCats: cat_boolean, checkedVerifs: verif_boolean, filteredCategories: [], filteredVerifications: [], priceFilter: '10000-10000000'
            })
          })
      }
      )
  }

  setCart = order => {
    let newTotal = parseFloat(this.state.cartTotal) + parseFloat(order.total_price)
    this.setState({ cart: [...this.state.cart, order], cartTotal: newTotal.toFixed(2) })
  }

  logoutUser = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
    localStorage.removeItem('name')
    localStorage.removeItem('address')
    this.setState({ currentUser: null, admin: false, userName: null })
  }

  checkout = () => {
    if (this.state.cart.length > 0) {
      fetch(url + '/checkout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          orders: this.state.cart
        })
      })
        .then(res => res.json())
        .then(data => {
          alert(`Your total is: ${data.total}`)
          this.setState({ cart: [], cartTotal: 0.00 })
          this.refreshIndex(data.orders)
        })
    }
  }

  removeOrder = (id) => {
    fetch(url + `/orders/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        let newTotal = parseFloat(this.state.cartTotal) - parseFloat(data.total_price)
        this.setState({ cartTotal: newTotal.toFixed(2), cart: this.state.cart.filter(order => order.id !== data.id) })
      })
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
    let array = Object.entries(this.state.checkedCats).map(category => category[0] === e.target.innerText ? [category[0], !category[1]] : [category[0], category[1]])
    if (this.state.checkedCats[`${e.target.innerText}`]) {
      categoryArr = this.state.filteredCategories.filter(cat => cat !== e.target.innerText)
      this.setState({ checkedCats: Object.fromEntries(array), filteredCategories: categoryArr })
    } else {
      categoryArr = [...this.state.filteredCategories, e.target.innerText]
      this.setState({ checkedCats: Object.fromEntries(array), filteredCategories: categoryArr })
    }
    // this.categoryFilter(categoryArr)
  }

  toggleVerification = (e) => {
    let verificationArr = []
    let verif = e.target.innerText.toLowerCase()
    let array = Object.entries(this.state.checkedVerifs).map(category => category[0] === verif ? [category[0], !category[1]] : [category[0], category[1]])
    if (this.state.checkedVerifs[`${verif}`]) {
      verificationArr = this.state.filteredVerifications.filter(cat => cat !== verif)
      this.setState({ checkedVerifs: Object.fromEntries(array), filteredVerifications: verificationArr })
    } else {
      verificationArr = [...this.state.filteredVerifications, verif]
      this.setState({ checkedVerifs: Object.fromEntries(array), filteredVerifications: verificationArr })
    }
  }

  changeSearchField = (e) => {
    this.setState({ searchField: e.target.value })
  }

  setPriceFilter = (value) => {
    this.setState({ priceFilter: value })
  }

  loginUser = (e, username, password) => {
    e.preventDefault()
    fetch(url + '/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('id', data.id)
          localStorage.setItem('admin', data.admin)
          localStorage.setItem('name', data.first_name)
          localStorage.setItem('address', data.address)
          this.setState({ currentUser: parseInt(data.id), userName: data.first_name, admin: data.admin, address: data.address })
          this.fetchItems()
          fetch(url + `/cart?user_id=${localStorage.getItem('id')}`)
            .then(res => res.json())
            .then(cartData => {
              let total = cartData.reduce(function (acc, obj) { return acc + parseFloat(obj.total_price); }, 0);
              this.setState({ cart: cartData, cartTotal: total.toFixed(2) })
            })
        } else {
          alert(data.message)
        }
      })
  }

  filter = () => {

    let hash = [
      'unchecked',
      'poor',
      'adequate',
      'good',
      'best'
    ]

    let filteredbyCat
    if (this.state.filteredCategories.length === 0) {
      filteredbyCat = this.state.artifacts
    } else {
      filteredbyCat = this.state.artifacts.filter(artifact => this.state.filteredCategories.includes(artifact.category.name))
    }
    if (this.state.filteredVerifications.length > 0) {
      filteredbyCat = filteredbyCat.filter(artifact => this.state.filteredVerifications.includes(hash[artifact.verification_number]))
    }
    return filteredbyCat.filter(artifact => parseFloat(artifact.list_price) >= parseFloat(this.state.priceFilter.split('-')[0]) && parseFloat(artifact.list_price) <= parseFloat(this.state.priceFilter.split('-')[1]))
  }

  render() {
    return (

      <Router>
        <Route path='/' render={() => {
          if (this.state.currentUser) {
            return <Redirect to='/artifacts' />
          } else {
            return <Redirect to='/login' />
          }
        }} />
        <Route exact path='/login' render={() => <Login formSubmit={this.loginUser} />} />
        <SideBar
          userName={this.state.userName}
          logout={this.logoutUser}
          categories={this.state.categories}
          handleChange={this.changeSearchField}
          handlePrice={this.setPriceFilter}
          handleCategories={this.categoryFilter}
          checkedCats={this.state.checkedCats}
          toggleCategory={this.toggleCategory}
          checkedVerifs={this.state.checkedVerifs}
          toggleVerifs={this.toggleVerification}
          cart={this.state.cart}
        />

       
          <Switch >
            <div style={{ marginLeft: '200px', minWidth: '550px' }}>
              <Route exact path='/cart' render={() =>
                <Cart checkout={this.checkout} removeOrder={this.removeOrder} orders={this.state.cart} total={this.state.cartTotal} />}
              />

              <Route exact path='/profile' render={() =>
                <UserProfile
                  userName={this.state.userName}
                  address={this.state.address}
                  currentUser={this.state.currentUser}
                  admin={this.state.admin}
                />} />

              <Route exact path='/about' render={() =>
                <About />} />

              <Route exact path='/artifacts' render={() =>
                this.state.artifacts.length === 0 ?


                  <>
                    <Loader active style={{ marginTop: '20px' }} inline='centered' />
                    <div style={{ textAlign: 'center', color: '#a8a7b9' }}>Loading</div>

                  </>

                  :
                  <>

                    <ArtContainer artifacts={this.filter()} searchField={this.state.searchField} />

                  </>
              } />

              <Route exact path='/artifacts/:id' render={(props) =>

                <ArtDetail currentUser={this.state.currentUser} id={props.match.params.id} setCart={this.setCart} />
              } />
            </div>
          </Switch> 
      </Router>
    );
  }
}
