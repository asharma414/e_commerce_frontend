import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../images/bp2.jpg'

export default class Login extends Component {
    render() {
        return (
          
            <div className='Login-component'>
                <img src={logo}/>
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
                
                    <Button basic color='grey' type='submit'>Submit</Button>
                   
                </Form>
                <br/>
                Don't have an account? <Link to='/register'>Register here.</Link>
               </div>
            </div>
            
        )
    }
}




