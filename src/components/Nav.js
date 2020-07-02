import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'



export default class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return (

            <Menu secondary>
                <Menu.Item
                    name='home'
                    active={this.state.activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='profile'
                    active={this.state.activeItem === 'profile'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='cart'
                    active={this.state.activeItem === 'cart'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={this.state.activeItem === 'logout'}
                        onClick={this.handleItemClick}
                    />
                </Menu.Menu>
            </Menu>


        )
    }
}
