import React, { Component } from 'react'
import { Jumbotron, ListGroup } from 'react-bootstrap'
import { Image, Loader, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {

    state = {
        totalSales: null,
        salesByCategory: null,
        salesByVerification: null
    }

    componentDidMount() {
        fetch((process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000') + '/stats')
            .then(res => res.json())
            .then(data => this.setState({ totalSales: data.total_sales, salesByCategory: data.sales_by_category, salesByVerification: data.sales_by_verification }))
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
                </p>


            </Jumbotron>
        )
    }
}
