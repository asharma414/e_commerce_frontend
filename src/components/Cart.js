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
        fetch((process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000') + `/cart?user_id=${localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(data => {
            let total = data.reduce(function (acc, obj) { return acc + parseFloat(obj.total_price); }, 0);
            this.setState({orders: data, total: total.toFixed(2)})
        })
    }

    
    checkout = () => {
        if (this.state.orders.length > 0){
            fetch((process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000') + '/checkout', {
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
            this.props.refreshIndex(data.orders)
        })
    } 
    }

    removeOrder = (id) => {
        fetch((process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000') + `/orders/${id}`, {
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

            <Jumbotron className='cart-jumbotron'>
                    <ListGroup >
                    {this.state.orders.map(order => <ListGroup.Item><Image src={order.artifact.primary_image} avatar/><Link to={'/artifacts/'+order.artifact.id}>{order.artifact.title}</Link> List Price: ${parseFloat(order.total_price).toFixed(2)}  
                    <Button style={{ color: '#58768d'}} floated='right' onClick={() => this.removeOrder(order.id)}>Remove</Button></ListGroup.Item>)}
                    </ListGroup>
                    <div>
                        <br/>
                        <span><h5 style={{textAlign: 'right'}}>Total: ${this.state.total}</h5></span>
                        <br/>
                    </div>
                    <br/>
                    <div>
                        <Button style={{ color: '#58768d'}} floated='right' onClick={this.checkout}>Checkout</Button>
                        <Button style={{ color: '#58768d'}} floated='left' onClick={() => this.props.history.goBack()}>Back</Button>
                    </div>
            </Jumbotron>
        )
    }
}

export default withRouter(Cart)