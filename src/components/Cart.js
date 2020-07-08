import React, { Component } from 'react'
import { Jumbotron, ListGroup } from 'react-bootstrap'
import { Image, Loader, Button, Icon } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

class Cart extends Component {
    
    state = {
        orders: [],
        total: 0
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/cart?user_id=${localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(data => {
            let total = data.reduce(function (acc, obj) { return acc + parseFloat(obj.total_price); }, 0);
            this.setState({orders: data, total: total.toFixed(2)})
        })
    }

    
    checkout = () => {
        if (this.state.orders.length > 0){
        fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({
                orders: this.state.orders
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Your total is: ${data.total}`)
            this.setState({orders: [], total: 0.00})
        })
    } 
    }

    removeOrder = (id) => {
        fetch(`http://localhost:3000/orders/${id}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json', Accept: 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            let newTotal = parseFloat(this.state.total) - parseFloat(data.total_price)
            this.setState({total: newTotal.toFixed(2), orders: this.state.orders.filter(order => order.id !== data.id)})
        })
    }
    
    render() {
        return (
            <Jumbotron>
                    <ListGroup variant="flush">
                    {this.state.orders.map(order => <ListGroup.Item><Link to={'/artifacts/'+order.artifact.id}>{order.artifact.title} - ${parseFloat(order.total_price).toFixed(2)}</Link>  <Button onClick={() => this.removeOrder(order.id)}>Remove</Button></ListGroup.Item>)}
                    </ListGroup>
                    <ListGroup horizontal>
                        <span>Total: ${this.state.total}</span>
                        <Button onClick={this.checkout}>Checkout</Button>
                    </ListGroup>
            <br />
            <Button variant='danger' onClick={() => this.props.history.goBack()}>Back To Home</Button>
        </Jumbotron>
        )
    }
}

export default withRouter(Cart)