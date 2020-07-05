import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu, Accordion, Form } from 'semantic-ui-react'
import logo from '../images/e-licit.png'

const FilterForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label='Red' name='color' value='red' />
      <Form.Checkbox label='Orange' name='color' value='orange' />
      <Form.Checkbox label='Green' name='color' value='green' />
      <Form.Checkbox label='Blue' name='color' value='blue' />
    </Form.Group>
  </Form>
)

export default class SideBar extends Component {
  state = { activeIndex: 0 }

  handleDropdown = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, activeIndex } = this.state

    return (
      <Menu className='ui left fixed vertical menu'>
        <Menu.Item >
          <img src={logo} />
        </Menu.Item>

        <Menu.Item>
          <Input placeholder='Search by Title'
            onChange={this.props.handleChange}
          />
        </Menu.Item>

        <Menu.Item>
          Home
          <Menu.Menu>
            <Menu.Item
              name='search'
              active={activeItem === 'search'}
              onClick={this.handleItemClick}
            >
              About
            </Menu.Item>
            <Menu.Item
              name='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
            >
              Favorites
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          name='browse'
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}>
          <Icon name='grid layout' />
          Browse
        </Menu.Item>

        <Accordion style ={{marginLeft: '10px'}} vertical>
          <Accordion.Title
            active={activeIndex === 1}
            content='Filter By'
            index={1}
            onClick={this.handleDropdown}/>
          <Accordion.Content active={activeIndex === 1} content={FilterForm} />
        </Accordion>

        {/* <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}>
          Logout
          </Menu.Item> */}
        </Menu >
    )
  }
}