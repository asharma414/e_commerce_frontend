import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu, Accordion, Form } from 'semantic-ui-react'
import logo from '../images/e-licit.png'

// const FilterbyPrice = (
//   <Form >
//     <Form.Group grouped>
//       <Form.Checkbox label='$10K - $500K' name='$10K - $500K' value='10000-500000' />
//       <Form.Checkbox label='$500K - $1M' name='$500K - $1M' value='500000-1000000' />
//       <Form.Checkbox label='$1M - $5M' name='$1M - $5M' value='1000000-5000000' />
//       <Form.Checkbox label='$5M - $10M' name='$5M - $10M' value='5000000-10000000' />
//     </Form.Group>
//   </Form>
// )

export default class SideBar extends Component {
  state = { 
    activeIndex: 0,
    checked: false
  }

handleCheckClick = (e) => {
  debugger
  this.setState({ checked: !this.state.checked });
  this.props.handlePrice(e)
  console.log(e.currentTarget.value)
}

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

        <Accordion style={{ marginLeft: '10px' }}>
          <Accordion.Title
            active={activeIndex === 1}
            content='Price'
            index={1}
            onClick={this.handleDropdown} />
          <Accordion.Content active={activeIndex === 1} content=
            {<Form>
              <Form.Group grouped >
                <div className = 'field'>
                <div className = 'ui checkbox'>
                  <input 
                  className = 'hidden' 
                  name='$10K - $500K' readOnly
                  tabindex='0'
                  type='checkbox'
                  value='10000-500000'
                  checked={this.state.checked}
                  onChange={this.handleCheckClick}
                 />
                 <label>$10K - $500K</label>
                </div>
                </div>
                
              </Form.Group>
            </Form>}
          />
        </Accordion>

        {/* <Accordion style={{ marginLeft: '10px' }} vertical>
          <Accordion.Title
            active={activeIndex === 1}
            content='Century'
            index={1}
            onClick={this.handleDropdown} />
          <Accordion.Content active={activeIndex === 1} content={FilterbyPrice} />
        </Accordion>

        <Accordion style={{ marginLeft: '10px' }} vertical>
          <Accordion.Title
            active={activeIndex === 1}
            content='Material'
            index={1}
            onClick={this.handleDropdown} />
          <Accordion.Content active={activeIndex === 1} content={FilterbyPrice} />
        </Accordion> */}

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