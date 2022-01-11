import React, { useEffect, useState } from 'react'
import { recoverpassword, sentotp, getenptoken } from '../config/Myservice'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { AiOutlineInfo } from 'react-icons/ai'
import { MdPhone, MdInfo } from 'react-icons/md'
import { Container, Form, FormControl, InputGroup, Button } from 'react-bootstrap'


const styled = {
    margin: 0,
    fontSize: 'small',
    color: 'red'
}

export default function RecoverPassword() {
    const location = useLocation()
    const [data, setData] = useState({ verificationcode: '', password: '', confirmpassword: '' })
    const [errors, setErrors] = useState({ verificationcode: '', password: '', confirmpassword: '', submit: '' })
    const [msg, setMsg] = useState(false)
    const [msgotperr, setMsgOtpErr] = useState(false)
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        sentotp({ email: location.state.email })
            .then(res => {
                if (res.data.err === 0) {
                    sessionStorage.setItem('enpstd', res.data.token)
                    setMsg(true);
                    setMsgOtpErr(false)
                }
            })
            .catch(err => { setMsg(false); setMsgOtpErr(true) })
        return () => {
            sessionStorage.removeItem('enpstd')
        }
    }, [])

    function handler(e) {
        let n = e.target.name
        let v = e.target.value
        setData({ ...data, [n]: v })
        console.log(n, e.target.value)
    }

    const submit = () => {
        let tmp = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
        let tmp2 = data
        delete tmp2.confirmpassword
        tmp2.email = location.state.email
        console.log(tmp2)
        let send = CryptoJS.AES.encrypt(JSON.stringify(tmp2), tmp).toString();
        console.log(send)
        recoverpassword({ data: send })
            .then(res => {
                if (res.data.err === 0)
                    console.log("PASSWORD CHANGED")
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <div className="login" >
                <Form style={{ width: '50vw', marginBottom: '20px', textAlign: 'center' }}>
                    <h2>Recover Password</h2><hr />
                    {msg ?
                        <p style={{ color: 'red' }}><AiOutlineInfo style={{ color: 'white', backgroundColor: 'red', borderRadius: '50%', fontSize: 'medium' }} /> Verification code has been sent to your registered mail ID</p>
                        : ''}
                    {msgotperr ?
                        <p style={{ color: 'red' }}>Error sending verification code to your registered mail ID or possibly due to user not found(if so please register first).</p>
                        : ''}
                    <Form.Group>
                        <FormControl name="verificationcode" placeholder="Verification code" type="text" onChange={handler} />
                        <p style={styled}>{errors.verificationcode}</p>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <FormControl name="password" placeholder="New Password" type={showpassword ? "text" : "password"} onChange={handler} />
                            {showpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setShowPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setShowPassword(true)} />
                            }
                        </InputGroup>
                        <p style={styled}>{errors.password}</p>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <FormControl name="confirmpassword" placeholder="Confirm Password" type={showconfirmpassword ? "text" : "password"} onChange={handler} />
                            {showconfirmpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setShowConfirmPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setShowConfirmPassword(true)} />
                            }
                        </InputGroup>
                        <p style={styled}>{errors.showconfirmpassword}</p>
                    </Form.Group>
                    <Button onClick={() => submit()}>Submit</Button>
                    <p style={styled}>{errors.submit}</p>
                </Form>
            </div>
        </Container>
    )
}
