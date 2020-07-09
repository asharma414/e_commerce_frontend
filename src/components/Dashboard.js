import React, { Component } from 'react'
import { Jumbotron, ListGroup } from 'react-bootstrap'
import { Image, Loader, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
    render() {
        return (
            <Jumbotron className='cart-jumbotron'>
                    
              <span><h4><b>Welcome, {this.props.userName}</b></h4></span>
              <br/>
              <p>These are your sales statistics:</p>

              
                  
                
            </Jumbotron>
        )
    }
}
