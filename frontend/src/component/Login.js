import React, { useState } from 'react'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
export default function Login() {
    const [showpassword, setShowPassword] = useState(false)
    return (
        <div className="loginpage" >
            <div className='socialLogin'>
                <div style={{ backgroundColor: '#4267B2' }}>Login with Facebook</div>
                <div style={{ backgroundColor: '#DB4437' }}>Login with Google</div>
                <div style={{ backgroundColor: '#1DA1F2' }}>Login with Twitter</div>
                <p style={{ alignSelf: 'end', width: '100%', textAlign: 'end' }}>Register Now</p>
            </div>
            <hr />
            <div className="login">
                <Form>
                    <h3>Login to NeoSTORE</h3>
                    <Form.Group>
                        <InputGroup>
                            <FormControl type="email" placeholder="Email Address" />
                            <IoMdMail className="iconlogin" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <FormControl type="password" placeholder="Password" type={showpassword ? "text" : "password"} />
                            {showpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setShowPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setShowPassword(true)} />
                            }
                        </InputGroup>
                    </Form.Group>
                    <Button>Login</Button>
                </Form>
                <p style={{ alignSelf: 'end', width: '100%', textAlign: 'start' }}>Forgot Password ?</p>
            </div>
        </div >
    )
}
