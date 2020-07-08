import React, { Component } from 'react'

export default class Cart extends Component {
    
    state={
        orders: []
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/cart?user_id=${localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(data => this.setState({orders: data}))
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
