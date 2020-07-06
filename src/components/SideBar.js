import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu, Accordion, Form, Radio } from 'semantic-ui-react'
import Checkbox from './Checkbox'
import logo from '../images/e-licit.png'


export default class SideBar extends Component {
  state = { 
    activeIndex: 0,
    value: '10000-10000000'
  }

  handleChange = (e, { value }) => {
    this.props.handlePrice(value)
    this.setState({ value })
  }


  // static getDerivedStateFromProps(props, state) {
  //   if (props.categories.length > 0) {
  //     let categories = {}
  //     props.categories.map(category => categories[`${category.name}`] = false)
  //     return {categories: categories}
  //   }
  // }



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
      <div class='sidebar'>
      <Menu className='ui fixed vertical menu'>
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

        <Accordion style={{ marginLeft: '10px' }}>
          <Accordion.Title
            active={activeIndex === 1}
            content='Price'
            index={1}
            onClick={this.handleDropdown} />
          <Accordion.Content active={activeIndex === 1} content=
            {<Form>
          <Form.Field>
          <Radio
            label='All'
            name='radioGroup'
            value='10000-10000000'
            checked={this.state.value === '10000-10000000'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='$10K - $500K'
            name='radioGroup'
            value='10000-500000'
            checked={this.state.value === '10000-500000'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='$500K - $1M'
            name='radioGroup'
            value='500000-1000000'
            checked={this.state.value === '500000-1000000'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='$1M - $5M'
            name='radioGroup'
            value='1000000-5000000'
            checked={this.state.value === '1000000-5000000'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='$5M - $10M'
            name='radioGroup'
            value='5000000-10000000'
            checked={this.state.value === '5000000-10000000'}
            onChange={this.handleChange}
          />
        </Form.Field>
      </Form>}
          />
        </Accordion>
        <Accordion style={{ marginLeft: '10px' }}>
          <Accordion.Title
            active={activeIndex === 2}
            content='Category'
            index={2}
            onClick={this.handleDropdown} />
          <Accordion.Content active={activeIndex === 2} content=
            {<Form>
         {this.props.categories.map(category => {
         return <Form.Field key={'cat' + category.id}>
            <Checkbox handleCategories={this.props.handleCategories} category={category} checked={this.props.checked} toggleCategory={this.props.toggleCategory} />
          </Form.Field>
         }
         )}
      </Form>}
          />
        </Accordion>
      </Menu>
      </div>
    )
  }
}