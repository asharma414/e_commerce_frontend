import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu, Accordion, Form, Radio, Checkbox } from 'semantic-ui-react'
import logo from '../images/e-licit.png'
import { withRouter } from 'react-router-dom';


class SideBar extends Component {
  state = { 
    activeIndexes: [],
    value: '10000-10000000'
  }

  handleChange = (e, { value }) => {
    this.props.handlePrice(value)
    this.setState({ value })
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndexes } = this.state;
    const newIndex = activeIndexes;
    
    const currentIndexPosition = activeIndexes.indexOf(index);
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
      newIndex.push(index);
    }

    this.setState({ activeIndexes: newIndex });
  };
    

  render() {
    const { activeIndexes } = this.state;

    return (
    
      <Menu className='ui vertical menu' id='left-column'>
        <Menu.Item onClick={() => this.props.history.push('/artifacts')}>
          
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
              
              onClick={this.handleItemClick}
            >
              About
            </Menu.Item>
            <Menu.Item
              name='about'
           
              onClick={this.handleItemClick}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              name='profile'
              
              onClick={this.handleItemClick}
            >
              Favorites
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          name='browse'
        
          onClick={this.handleItemClick}>
          <Icon name='grid layout' />
          Browse
        </Menu.Item>

        <Accordion style={{ marginLeft: '10px' } } >
          <Accordion.Title
            active={activeIndexes.includes(0)}
            content='Price'
            index={0}
            onClick={this.handleClick} />
          <Accordion.Content 
          active={activeIndexes.includes(0)} 
          content=
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
        <Accordion style={{ marginLeft: '10px' }} >
          <Accordion.Title
            active={activeIndexes.includes(1)}
            content='Category'
            index={1}
            onClick={this.handleClick} />
          <Accordion.Content active={activeIndexes.includes(1)} content=
            {<Form>
         {this.props.categories.map(category => {
         return <Form.Field key={'cat' + category.id}>
            <Checkbox
            label={category.name}
            onChange={this.props.toggleCategory}
            checked={this.props.checked[`${category.name}`]} 
            />
          </Form.Field>
         }
         )}
      </Form>}
          />
        </Accordion>
      </Menu>
    
    )
  }
}

export default withRouter(SideBar)