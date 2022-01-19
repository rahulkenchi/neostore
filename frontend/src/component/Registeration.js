import React, { useState, useEffect } from 'react'
import { registeration, getenptoken } from '../config/Myservice'
import SocialLogin from './SocialLogin'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { MdPhone } from 'react-icons/md'
import { ImFacebook, ImGoogle } from 'react-icons/im'
import { Container, Form, FormControl, InputGroup, Button, Spinner } from 'react-bootstrap'
const regExpName = new RegExp(/^[a-zA-Z]{2,20}$/)
const regExpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const regExpPass = new RegExp(/^[a-zA-Z0-9]{8,20}$/)
const regMobile = new RegExp(/^[987][0-9]{9}$/)

export default function Registeration() {
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: ' ', mobile: '', gender: '' })
    const [errors, setErrors] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '', mobile: '', gender: 'not selected', submit: '' })

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
        if (n === "firstname" || n === "lastname") {
            !regExpName.test(v) ? setErrors({ ...errors, [n]: "Not a valid Name" }) : setErrors({ ...errors, [n]: "" })
        }
        if (n === "email") {
            !regExpEmail.test(v) ? setErrors({ ...errors, [n]: "Not a valid Email" }) : setErrors({ ...errors, [n]: "" })
        }
        else if (n === "mobile") {
            !regMobile.test(v) ? setErrors({ ...errors, [n]: "Not a valid Mobile" }) : setErrors({ ...errors, [n]: "" })
        }
        else if (n === "password" || n === "confirmpassword") {
            !regExpPass.test(v) ? setErrors({ ...errors, [n]: "Not a valid Password" }) : setErrors({ ...errors, [n]: "" })
        }
        else if (n === "gender") {
            setErrors({ ...errors, [n]: "" })
        }
        if (errors.submit.length != 0) { setErrors({ ...errors, submit: '' }) }
        setData({ ...data, [n]: v })
    }

    const register = () => {
        if (data.password != data.confirmpassword) {
            setErrors({ ...errors, 'password': 'Password does not match', 'confirmpassword': 'Password does not match' })
        }
        else {
            setErrors({ ...errors, 'password': '', 'confirmpassword': '' })
            let tmp = Object.keys(errors)
            tmp.pop()
            let count = tmp.reduce((sum, ele) => sum + errors[ele].length, 0)
            if (count === 0) {
                let t = Object.keys(data)
                let count2 = t.reduce((sum, ele) => { if (data[ele].length === 0) { return sum + 1 } return sum }, 0)
                if (count2 === 0) {
                    let tmp2 = { ...data }
                    delete tmp2.confirmpassword
                    console.log(tmp2)
                    let tmp3 = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
                    let send = CryptoJS.AES.encrypt(JSON.stringify(tmp2), tmp3).toString();
                    registeration({ data: send })
                        .then(res => {
                            console.log(res.data.msg, res.data.err);
                            switch (res.data.err) {
                                case 0: navigate("/login")
                                    break;
                                case 1: setErrors({ ...errors, submit: res.data.msg })
                                    break;
                                case 2: setErrors({ ...errors, submit: res.data.msg })
                                    break;
                            }
                            setSpinner(false)
                        })
                        .catch(err => {
                            alert("error connecting registering user please try again later.");
                            setSpinner(false);
                        })
                }
                else if (count2 != 0) {
                    setErrors({ ...errors, submit: 'Some fields are empty' })
                    setSpinner(false)
                }
            }
            else if (count != 0) {
                setErrors({ ...errors, submit: 'Some fields are empty' })
                setSpinner(false)
            }
        }
    }

    const handleSocialLogin = (user) => {
        // console.log(user)
        let tmp = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
        let send = CryptoJS.AES.encrypt(JSON.stringify(user), tmp).toString()
        registeration({ 'data': send })
            .then(res => {
                if (res.data.err === 0)
                    navigate("/login")
                else {
                    console.log(res.data.msg)
                }
            })
            .catch(err => alert(JSON.stringify(err)))
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    return (
        <Container>
            <Form className="registration" >
                <div className="d-flex justify-content-center">
                    <SocialLogin
                        style={{ backgroundColor: '#4267B2' }}
                        className="facebook"
                        provider="facebook"
                        appId="530980681768179"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}>
                        <ImFacebook style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Facebook
                    </SocialLogin>
                    <SocialLogin
                        style={{ backgroundColor: '#DB4437' }}
                        className="google"
                        provider="google"
                        appId="443267988237-4lch3ldhcbf9150nm7urethq8kaicd9o.apps.googleusercontent.com"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}>
                        <ImGoogle style={{ fontSize: 'xx-large', paddingRight: '10px' }} />Login with Google
                    </SocialLogin>
                </div>
                <hr />
                <h3>Register to NeoSTORE</h3>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="text" placeholder="First Name" name="firstname" onChange={handler} />
                        {/* change icon here */}
                    </InputGroup>
                    <p className="errors">{errors.firstname}</p>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="text" placeholder="Last Name" name="lastname" onChange={handler} />
                    </InputGroup>
                    <p className="errors">{errors.lastname}</p>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="email" placeholder="Email Address" name="email" onChange={handler} />
                        <IoMdMail className="iconlogin" />
                    </InputGroup>
                    <p className="errors">{errors.email}</p>

                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type={showpassword ? "text" : "password"} placeholder="Password" name="password" onChange={handler} />
                        {showpassword ?
                            <BsEyeFill className="iconlogin" onClick={() => setShowPassword(false)} />
                            :
                            <BsEyeSlashFill className="iconlogin" onClick={() => setShowPassword(true)} />
                        }
                    </InputGroup>
                    <div className="d-flex justify-content-between">
                        <p className="errors">{errors.password}</p>
                        <p className="text-black small mb-0">8-12 Alphanumeric characters</p>
                    </div>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type={showconfirmpassword ? "text" : "password"} placeholder="Confirm Password" name="confirmpassword" onChange={handler} />
                        {showconfirmpassword ?
                            <BsEyeFill className="iconlogin" onClick={() => setShowConfirmPassword(false)} />
                            :
                            <BsEyeSlashFill className="iconlogin" onClick={() => setShowConfirmPassword(true)} />
                        }
                    </InputGroup>
                    <div className="d-flex justify-content-between">
                        <p className="errors">{errors.confirmpassword}</p>
                        <p className="text-black small mb-0">8-12 Alphanumeric characters</p>
                    </div>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="text" placeholder="Mobile No." name="mobile" onChange={handler} />
                        <MdPhone className="iconlogin" />
                    </InputGroup>
                    <div className="d-flex justify-content-between">
                        <p className="errors"><span className='text-black'>Max 10</span>{errors.mobile}</p>
                        <p className='mb-0'><span className='text-black'>{data.mobile.length}/10</span></p>
                    </div>
                </Form.Group>
                <Form.Group>
                    <input type='radio' value="Male" id="gender1" name="gender" onChange={handler} /><label for="gender1">Male</label>
                    <input type='radio' value="Female" id="gender2" name="gender" onChange={handler} /><label for="gender2">Female</label>
                </Form.Group>
                <p className="errors">{errors.gender}</p>
                <Button onClick={() => { setSpinner(true); register(); }} disabled={spinner}>{spinner && <Spinner animation="border" size="sm" />} Register</Button>
                <p className="errors">{errors.submit}</p>
            </Form>
        </Container>
    )
}
