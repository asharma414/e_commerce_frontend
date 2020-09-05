import React, { Component } from 'react'
import { Jumbotron, ListGroup } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

class UserProfile extends Component {

    state = {
        orders: [], 
        totalSales: null,
        salesByCategory: null,
        salesByVerification: null
    }

    componentDidMount() {
        fetch(url + `/users/${this.props.currentUser}/orders`)
        .then(res => res.json())
        .then(data => this.setState({orders: data}))
        if (this.props.admin) {
            fetch( url + '/stats')
            .then(res => res.json())
            .then(data => this.setState({ totalSales: data.total_sales, salesByCategory: data.sales_by_category, salesByVerification: data.sales_by_verification }))
        }
    }


    render() {
        let salesByCat = []
        for (const key in this.state.salesByCategory) {
            salesByCat.push(<><strong>{key}:</strong> <p>${parseInt(this.state.salesByCategory[key]).toFixed(2)}</p></>)
        }

        let salesByVerif = []
        for (const key in this.state.salesByVerification) {
            salesByVerif.push(<><strong>{key}:</strong> <p>${parseInt(this.state.salesByVerification[key]).toFixed(2)}</p></>)
        }
        return (
           
            <Jumbotron className='cart-jumbotron'>

                <span><h4><b>Welcome, {this.props.userName}</b></h4></span>
                {this.props.admin ? 
                <>
                <br />
                <p>These are your store's sales statistics:</p>
                <h4>Total Sales:</h4>
                <p>${parseInt(this.state.totalSales).toFixed(2)}</p>
                <h4>Sales By Category:</h4>
                <p>
                    {salesByCat}
                </p>
                <h4>Sales By Verification:</h4>
                <p>
                    {salesByVerif}
                </p> </> 
                : null } 


            
                   {/* <span style={{fontSize: '18px', fontWeight: '900'}}> Welcome, {this.props.userName}!</span> */}
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

        )
    }
}

export default withRouter(UserProfile)

