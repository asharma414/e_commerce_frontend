import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import logo from '../images/bp2.jpg'
const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        registerShow: false,
        firstName: '',
        lastName: '',
        regUsername: '',
        address: '',
        city: '', 
        st: '',
        regPassword: '',
        confirmPassword: ''
    }

    handleShow = (modal) => {
        this.setState({ [modal]: true })
    }

    handleClose = (modal) => {
        this.setState({ [modal]: false })
    }

    formChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    registerUser = (e) => {
        e.preventDefault();
        if (this.state.regPassword !== this.state.confirmPassword) {
          alert('Passwords must match!')
        } else  {
          fetch(url + '/users', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              username: this.state.regUsername,
              password: this.state.regPassword,
              address: this.state.address + ', ' + this.state.city + ', ' + this.state.st 
            })
          })
          .then(res => res.json())
          .then(data => {
              alert('Registration Successful');
              this.setState({firstName: '', lastName: '', regUsername: '', regPassword: '', confirmPassword: '', address: '', city: '', st: '', registerShow: false});
            })
        }
      }

    render() {
        return (
            <div>
                <img alt='Image Not Found' class='image-component' src={logo} />
                <div className='login_container'>
                    <Form onSubmit={(e) => {
                        this.setState({username: '', password: ''})
                        this.props.formSubmit(e, this.state.username, this.state.password)}}>
                        <Form.Group >
                        <Form.Input
                            name='username' required onChange={this.formChange} placeholder='Username' value={this.state.username} />
                      
                        <Form.Input
                            name='password' required onChange={this.formChange} placeholder='Password' value={this.state.password} type='password' />
                        </Form.Group> 
                        <br />
                        <Button basic color='ui grey inverted button' type='submit' content='Login'/>
                    </Form>
                    <br />
                    <div class='link-text'>
                    <div>
                        <div>Guest Login:</div>
                        <div>Username: guest; Password: 123</div>
                    </div>
                    Don't have an account? <span className="Change" onClick={() => this.handleShow('registerShow')}>Register here.</span>
                    <Modal show={this.state.registerShow} onHide={() => this.handleClose('registerShow')}>
                    <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.registerUser}>
                    <Form.Input
                            label='First Name' name='firstName' required onChange={this.formChange} placeholder='First Name' value={this.state.firstName} />
                    <Form.Input
                            label='Last Name' name='lastName' required onChange={this.formChange} placeholder='Last Name' value={this.state.lastName} />
                    <Form.Input
                            label='Street Address' name='address' required onChange={this.formChange} placeholder='Street Address' value={this.state.address} />
                    <Form.Input
                            label='City' name='city' required onChange={this.formChange} placeholder='City' value={this.state.city} />
                    <Form.Input
                            label='State' name='st' required onChange={this.formChange} placeholder='State' value={this.state.st} />
                    <Form.Input
                           label='Username' name='regUsername' required onChange={this.formChange} placeholder='Username' value={this.state.regUsername} />
                    <Form.Input
                           label='Password' name='regPassword' required onChange={this.formChange} placeholder='Password' value={this.state.regPassword} type='password' />
                    <Form.Input
                           label='Confirm Password' name='confirmPassword' required onChange={this.formChange} placeholder='Confirm Password' value={this.state.confirmPassword} type='password' />
                    <Modal.Footer>
                        <Form.Button basic type='submit' content='Register'/>
                    </Modal.Footer>
                </Form>

                    </Modal.Body>
                </Modal>
                    </div>
                
                </div>
            </div>

        )
    }
}




