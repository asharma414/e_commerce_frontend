import React, {Component} from 'react';
import './App.css';
import ArtContainer from './components/ArtContainer'
import Nav from './components/Nav'


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

      <div>
        <Nav 
        handleChange={this.changeSearchField} 
        />
        <ArtContainer 
        artifacts={this.state.artifacts}
        searchField={this.state.searchField}
        />
      </div >

    );
  }
}

