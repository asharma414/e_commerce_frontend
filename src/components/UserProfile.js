import React, { Component } from 'react'
import { Jumbotron, ListGroup } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { Image, Grid } from 'semantic-ui-react'

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
            // <Grid style={{marginLeft: '200px'}}>
                <Jumbotron  className='cart-jumbotron'>
                   <span style={{fontSize: '18px', fontWeight: '900'}}> Welcome, {this.props.userName}!</span>
                    <br />
                    <br />
                    <strong>Address:</strong> {this.props.address}
                    <br />
                    <br />
                    <strong>Your Purchase History:</strong>
                    <br />
                    <br />
                    <ListGroup style={{ overflow: 'auto', maxHeight: '250px' }}>
                    {this.state.orders.map(order => <ListGroup.Item><Image src={order.primary_image} avatar/><Link to={'/artifacts/'+order.id}>{order.title}</Link> 
                    <div style={{marginLeft: '35px'}}><strong>List Price:</strong> ${parseFloat(order.list_price).toFixed(2)}</div>
                    <div style={{marginLeft: '35px'}}><strong>Purchase Date:</strong> {new Date(order.updated_at).toLocaleString()}</div>
                    </ListGroup.Item>)}
                    </ListGroup>
                </Jumbotron>

            // </Grid>
        )
    }
}

export default withRouter(UserProfile)

