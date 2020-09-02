import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../images/bp2.jpg'

export default class Register extends Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    }

    formChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
            <img class='image-component' src={logo} />
            <div className='login_container'>
                <Form onSubmit={(e) => {
                        try {
                            this.props.formSubmit(e, this.state.firstName, this.state.lastName, this.state.username, this.state.password, this.state.confirmPassword);
                            this.setState({firstName: '', lastName: '', username: '', password: '', confirmPassword: ''})
                        } catch(e) {
                            alert(e)
                        }
                }}>
                    <Form.Group>
                    <Form.Input
                            name='firstName' required onChange={this.formChange} placeholder='First Name' value={this.state.firstName} />
                    <Form.Input
                            name='lastName' required onChange={this.formChange} placeholder='Last Name' value={this.state.lastName} />
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
