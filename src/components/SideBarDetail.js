import React, { Component } from 'react'
import { Menu, Button, Icon } from 'semantic-ui-react'
import logo from '../images/e-licit.png'
import { withRouter } from 'react-router-dom';


class SideBarDetail extends Component {



  render() {


    return (

      <Menu className='ui vertical menu' id='left-column'>

        <Menu.Item name='logout' onClick={this.props.logout}>
          Logout
        </Menu.Item>

        <Menu.Item onClick={() => this.props.history.push('/artifacts')}>
          <img src={logo} />
        </Menu.Item>


        <Menu.Item>
          Home
          <Menu.Menu>

            <Menu.Item name='profile' onClick={this.handleItemClick}>
              Profile
            </Menu.Item>

            <Menu.Item name='about' onClick={this.handleItemClick}>
              About
            </Menu.Item>

            <Menu.Item name='cart' onClick={this.handleItemClick}>
              Cart
            </Menu.Item>

          </Menu.Menu>
        </Menu.Item>


      </Menu>

    )
  }
}

export default withRouter(SideBarDetail)