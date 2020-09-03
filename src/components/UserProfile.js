import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'

class UserProfile extends Component {
    render() {
        return (
            <div>
                <Jumbotron className='cart-jumbotron'>
                   <span style={{fontSize: '18px', fontWeight: '900'}}> Welcome, {this.props.userName}!</span>
                    <br />
                    <br />
                    <strong>Address:</strong> {this.props.address}
                    <br />
                    <strong>Purchase History:</strong>

                </Jumbotron>

            </div>
        )
    }
}

export default withRouter(UserProfile)

