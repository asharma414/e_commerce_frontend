import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron className='cart-jumbotron'>
                Something descriptive about this site

                </Jumbotron>
            </div>
        )
    }
}

export default withRouter(About)