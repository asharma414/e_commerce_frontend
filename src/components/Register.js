import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../images/bp2.jpg'
const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'


export default class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        address: '',
        city: '', 
        st: '',
        password: '',
        confirmPassword: ''
    }

    formChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    registerUser = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
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
              username: this.state.username,
              password: this.state.password,
              address: this.state.address + ', ' + this.state.city + ', ' + this.state.st 
            })
          })
          .then(res => res.json())
          .then(data => {
              alert('Registration Successful');
              this.setState({firstName: '', lastName: '', username: '', password: '', confirmPassword: '', address: '', city: '', st: ''});
            })
        }
      }

    render() {
        return (
            <div>
            <img class='image-component' src={logo} />
            <div className='login_container'>
                <Form onSubmit={this.registerUser}>
                    <Form.Group>
                    <Form.Input
                            name='firstName' required onChange={this.formChange} placeholder='First Name' value={this.state.firstName} />
                    <Form.Input
                            name='lastName' required onChange={this.formChange} placeholder='Last Name' value={this.state.lastName} />
                    
                    </Form.Group>
                    <Form.Group>
                    <Form.Input
                            name='address' required onChange={this.formChange} placeholder='Street Address' value={this.state.address} />
                    <Form.Input
                            name='city' required onChange={this.formChange} placeholder='City' value={this.state.city} />
                    <Form.Input
                            name='st' required onChange={this.formChange} placeholder='State' value={this.state.st} />
                    
                    </Form.Group>
                    <Form.Group>
                    <Form.Input
                            name='username' required onChange={this.formChange} placeholder='Username' value={this.state.username} />
                    <Form.Input
                            name='password' required onChange={this.formChange} placeholder='Password' value={this.state.password} type='password' />
                    <Form.Input
                            name='confirmPassword' required onChange={this.formChange} placeholder='Confirm Password' value={this.state.confirmPassword} type='password' />
                    <Form.Button basic color='ui grey inverted button' type='submit' content='Register'/>
                    </Form.Group>
                </Form>
                <div class='link-text'>
                    Already have an Account? <Link to='/login'>Login here.</Link>
                </div>
            
            </div>
        </div>
        )
    }
}
