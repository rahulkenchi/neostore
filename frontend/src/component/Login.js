import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
export default function Login() {
    const [data, setData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '', submit: '' })
    const [showpassword, setShowPassword] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:9999/")
            .then(res => {
                if (res.data.err === 0) {
                    sessionStorage.setItem('enpstd', res.data.token)
                }
            })
        return () => {
            sessionStorage.removeItem('enpstd')
        }
    }, [])

    function handler(e) {
        let n = e.target.name
        let v = e.target.value
        setData({ ...data, [n]: v })
        console.log(data)
    }

    const login = () => {
        let tmp = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
        let send = CryptoJS.AES.encrypt(JSON.stringify(data), tmp).toString()
        console.log(send)
        axios.post("http://localhost:9999/login", { data: send })
            .then(res => {
                switch (res.data.err) {
                    case 0: console.log("OK LOGGED")
                        break;
                    case 1: console.log(res.data.msg)
                        break;
                    case 2: console.log(res.data.msg)
                        break;
                }
            })
            .catch(err => { if (err) throw err; })
    }

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
                            <FormControl type="email" placeholder="Email Address" name="email" onChange={handler} />
                            <IoMdMail className="iconlogin" />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <FormControl name="password" placeholder="Password" type={showpassword ? "text" : "password"} onChange={handler} />
                            {showpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setShowPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setShowPassword(true)} />
                            }
                        </InputGroup>
                    </Form.Group>
                    <Button onClick={() => login()}>Login</Button>
                </Form>
                <p style={{ alignSelf: 'end', width: '100%', textAlign: 'start' }}>Forgot Password ?</p>
            </div>
        </div >
    )
}
