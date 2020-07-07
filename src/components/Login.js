import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../images/bp2.jpg'

export default class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    formChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (
            <div>
                <img src={logo} />
                <div className='login_container'>
                    <Form onSubmit={(e) => {
                        this.setState({username: '', password: ''})
                        this.props.formSubmit(e, this.state.username, this.state.password)}}>
                        <Form.Field>
                            <label>Username</label>
                            <input name='username' required onChange={this.formChange} placeholder='Username' value={this.state.username} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input name='password' required onChange={this.formChange} placeholder='Password' value={this.state.password} type='password' />
                        </Form.Field>
                        <Button basic color='grey' type='submit'>Submit</Button>
                    </Form>
                    <br />
                Don't have an account? <Link to='/register'>Register here.</Link>
                </div>
            </div>

        )
    }
}




