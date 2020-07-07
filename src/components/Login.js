import React, { Component } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <div className='login_container'>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type='password'/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>

                <Link to='/register'>Register</Link>


            </div>
        )
    }
}




