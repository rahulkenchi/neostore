import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import SocialLogin from './SocialLogin'
import { getenptoken, login } from '../config/Myservice'
import { useNavigate } from 'react-router-dom'
import { IoMdMail } from 'react-icons/io'
import { ImFacebook, ImGoogle, ImTwitter } from 'react-icons/im'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Form, FormControl, Button, InputGroup, Spinner } from 'react-bootstrap'
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
        getenptoken()
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
    }

    const handleSocialLogin = (user) => {
        console.log(user);
        let a = {
            firstname: user._profile.firstName,
            lastname: user._profile.lastName,
            email: user._profile.email,
            profilepic: user._profile.profilePicURL,
            token: user._token.accessToken
        }
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    const submit = () => {
        let tmp = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
        let send = CryptoJS.AES.encrypt(JSON.stringify(data), tmp).toString()
        console.log(send)
        login({ data: send })
            .then(res => {
                console.log(res.data)
                switch (res.data.err) {
                    case 0: {
                        setErrors({ ...errors, email: '', password: '' });
                        sessionStorage.setItem('_token', res.data.token);
                        navigate("/")//navigate to home
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
                <SocialLogin
                    style={{ backgroundColor: '#4267B2', width: '30vw', height: '10vh' }}
                    className="facebook"
                    provider="facebook"
                    appId="530980681768179"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}>
                    <ImFacebook style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Facebook
                </SocialLogin>
                <SocialLogin
                    style={{ backgroundColor: '#DB4437', width: '30vw', height: '10vh' }}
                    className="google"
                    provider="google"
                    appId="443267988237-4lch3ldhcbf9150nm7urethq8kaicd9o.apps.googleusercontent.com"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}>
                    <ImGoogle style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Google
                </SocialLogin>
                <SocialLogin
                    style={{ backgroundColor: '#1DA1F2', width: '30vw', height: '10vh' }}
                    className="google"
                    provider="google"
                    appId="443267988237-4lch3ldhcbf9150nm7urethq8kaicd9o.apps.googleusercontent.com"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}>
                    <ImTwitter style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Twitter                    </SocialLogin>
                <p className="w-100 text-end"><span style={{ cursor: 'pointer' }} onClick={() => navigate("/register")}>Register Now</span></p>
            </div >
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
                    <Button onClick={() => submit()}>Login</Button>
                    <p style={styled}>{errors.submit}</p>
                </Form>
                <p className='w-100 text-start'><span style={{ cursor: 'pointer' }} onClick={() => navigate("/recoverpassword", { state: { email: data.email } })}>Forgot Password ?</span></p>
            </div>
        </div >
    )
}
