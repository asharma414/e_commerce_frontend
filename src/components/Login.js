import React, { Component } from 'react'
import { Button, Form, Modal} from 'semantic-ui-react'
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
                <img class='image-component' src={logo} />
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
                    Don't have an account? 
                
                        <Modal as={Form}
                        style={{ overflow: 'auto', position: 'relative', paddingTop: '25px', paddingRight: '115px', backgroundColor: '#c8d3d4' }}
                        trigger={<span className= 'Change'
                            // onClick={() => this.setState({ createModal: true })}
                            > Register here.</span>}> 
                            
                            
                            Test
                            </Modal>
                    </div>
                
                </div>
            </div>

        )
    }
}




