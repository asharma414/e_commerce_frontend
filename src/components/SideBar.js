import React, { Component } from 'react'
import { Icon, Input, Menu, Accordion, Form, Radio, Checkbox } from 'semantic-ui-react'
import logo from '../images/e-licit.png'
import { withRouter, Link } from 'react-router-dom';


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

    if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register') {
      return <span></span>
    } else {
      return (

        <Menu className='ui vertical menu' id='left-column'>

          <Menu.Item name='logout' onClick={this.props.logout}>
            Logout, {this.props.userName}
          </Menu.Item>

          <Menu.Item onClick={() => this.props.history.push('/artifacts')}>
            <img src={logo} />
          </Menu.Item>

          {this.props.location.pathname === '/artifacts' ?
            <Menu.Item>
              <Input placeholder='Search by Title' onChange={this.props.handleChange} />
            </Menu.Item> :
            null}

          <Menu.Item>
            <Link to='/artifacts' style={{ color: '#58768d' }}>Home</Link>
          <Menu.Menu>

              <Menu.Item name='profile' onClick={this.handleItemClick}>
                Profile
            </Menu.Item>

              <Menu.Item name='about' onClick={this.handleItemClick}>
                About
            </Menu.Item>

              <Menu.Item name='cart' onClick={this.handleItemClick}>
                <Link to='/cart' style={{ color: '#58768d' }}>Cart</Link>
              </Menu.Item>

            </Menu.Menu>
          </Menu.Item>
          {this.props.location.pathname === '/artifacts' ?
            <div><Menu.Item
              name='browse'>
          Filters
        </Menu.Item>

              <Accordion style={{ marginLeft: '10px' }} >
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
                          checked={this.props.checkedCats[`${category.name}`]}
                        />
                      </Form.Field>
                    }
                    )}
                  </Form>}
                />
              </Accordion>
              <Accordion style={{ marginLeft: '10px' }} >
                <Accordion.Title
                  active={activeIndexes.includes(2)}
                  content='Verification'
                  index={2}
                  onClick={this.handleClick} />
                <Accordion.Content active={activeIndexes.includes(2)} content=
                  {<Form>
                    <Form.Field>
                      <Checkbox
                        label='Unchecked'
                        onChange={this.props.toggleVerifs}
                        checked={this.props.checkedVerifs['unchecked']}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        label='Poor'
                        onChange={this.props.toggleVerifs}
                        checked={this.props.checkedVerifs['poor']}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        label='Adequate'
                        onChange={this.props.toggleVerifs}
                        checked={this.props.checkedVerifs['adequate']}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        label='Good'
                        onChange={this.props.toggleVerifs}
                        checked={this.props.checkedVerifs['good']}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox
                        label='Best'
                        onChange={this.props.toggleVerifs}
                        checked={this.props.checkedVerifs['best']}
                      />
                    </Form.Field>
                  </Form>}
                />
              </Accordion>
            </div> : null}
        </Menu>

      )
    }
  }
}

export default withRouter(SideBar)