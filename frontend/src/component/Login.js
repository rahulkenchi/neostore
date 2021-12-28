import React from 'react'
import { Container, Form, FormControl, Button } from 'react-bootstrap'
export default function Login() {
    return (
        <div className="loginpage" >
            <div className='socialLogin'>
                <div style={{ backgroundColor: 'blue' }}>Login with Facebook</div>
                <div style={{ backgroundColor: 'red' }}>Login with Google</div>
                <div style={{ backgroundColor: 'aqua' }}>Login with google</div>
            </div>
            <div style={{ width: '1vw', height: '50vh', backgroundColor: 'black' }}></div>
            <div className="login">
                <Form>
                    <h3>Login to NeoSTORE</h3>
                    <FormControl type="email" />
                    <FormControl type="password" />
                    <Button>Login</Button>
                </Form>
            </div>
        </div>
    )
}
