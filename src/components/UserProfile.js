import React, { Component } from 'react'
import { Jumbotron, ListGroup } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

class UserProfile extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        fetch(url + `/users/${this.props.currentUser}/orders`)
        .then(res => res.json())
        .then(data => this.setState({orders: data}))
    }

    render() {
        return (
            <div>
                <Jumbotron className='cart-jumbotron'>
                   <span style={{fontSize: '18px', fontWeight: '900'}}> Welcome, {this.props.userName}!</span>
                    <br />
                    <br />
                    <strong>Address:</strong> {this.props.address}
                    <br />
                    <br />
                    <strong>Purchase History:</strong>
                    <br />
                    <br />
                    <ListGroup style={{ overflow: 'auto', maxHeight: '250px' }}>
                    {this.state.orders.map(order => <ListGroup.Item><Image src={order.primary_image} avatar/><Link to={'/artifacts/'+order.id}>{order.title}</Link> List Price: ${parseFloat(order.list_price).toFixed(2)}</ListGroup.Item>)}
                    </ListGroup>
                </Jumbotron>

            </div>
        )
    }
}

export default withRouter(UserProfile)

