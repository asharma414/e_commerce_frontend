import React, { Component } from 'react'
import { Checkbox as Check } from 'semantic-ui-react' 

export default class Checkbox extends Component {
    
    // state = {
    //     toggle: false
    // }

    // toggle = () => {
    //     this.setState({toggle: !this.state.toggle})
    //     this.props.handleCategories()
    // }

    render() {
        return (
            <Check
            label={this.props.category.name}
            onChange={this.props.toggleCategory}
            checked={this.props.checked[`${this.props.category.name}`]}
          />
        )
    }
}
