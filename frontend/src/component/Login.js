import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import { IoMdMail } from 'react-icons/io'
import { ImFacebook, ImGoogle, ImTwitter } from 'react-icons/im'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
const styled = {
    margin: 0,
    fontSize: 'small',
    color: 'red'
}
export default function Login() {
    const navigate = useNavigate()
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
                console.log(res.data)
                switch (res.data.err) {
                    case 0: {
                        setErrors({ ...errors, email: '', password: '' });
                        sessionStorage.setItem('_token', res.data.token)
                    }
                        break;
                    case 1: setErrors({ ...errors, email: '', password: res.data.msg })
                        break;
                    case 2: setErrors({ ...errors, email: res.data.msg, password: '' })
                        break;
                }
            })
            .catch(err => { if (err) throw err; })
    }

    return (
        <div className="loginpage" >
            <div className='socialLogin'>
                <div style={{ backgroundColor: '#4267B2' }}><ImFacebook style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Facebook</div>
                <div style={{ backgroundColor: '#DB4437' }}><ImGoogle style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Google</div>
                <div style={{ backgroundColor: '#1DA1F2' }}><ImTwitter style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Twitter</div>
                <p className="w-100 text-end"><span style={{ cursor: 'pointer' }} onClick={() => navigate("/register")}>Register Now</span></p>
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
                        <p style={styled}>{errors.email}</p>
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
                        <p style={styled}>{errors.password}</p>
                    </Form.Group>
                    <Button onClick={() => login()}>Login</Button>
                    <p style={styled}>{errors.submit}</p>
                </Form>
                <p className='w-100 text-start'><span style={{ cursor: 'pointer' }} onClick={() => navigate("/recoverpassword")}>Forgot Password ?</span></p>
            </div>
        </div >
    )
}
