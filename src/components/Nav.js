import React, { Component } from 'react'
import { Input, Menu, Icon, Button } from 'semantic-ui-react'
import logo from '../images/e-licit_logo.png'


export default class Nav extends Component {

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (

            <Menu stackable>
                <Menu.Item>
                    <img src={logo} />
                </Menu.Item>

                <Menu.Item
                    name={'about'}
                    active={this.state.activeItem === 'about'}
                    onClick={this.handleItemClick}
                />

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search'
                            placeholder='Search by Title'
                            onChange={this.props.handleChange}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Button icon>
                            <Icon name='opencart' />
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button icon>
                            <Icon name='user outline' />
                        </Button>
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
