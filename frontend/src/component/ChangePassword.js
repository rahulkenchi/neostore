import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import { getenptoken, changepassword } from '../config/Myservice'
import { useNavigate } from 'react-router-dom'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Container, Form, FormControl, InputGroup, Button, Spinner } from 'react-bootstrap'
const regExpPass = new RegExp(/^[a-zA-Z0-9]{8,20}$/)

export default function ChangePassword() {
    const [spinner, setSpinner] = useState(false)
    const [data, setData] = useState({ oldpassword: '', password: '', confirmpassword: '' })
    const [errors, setErrors] = useState({ oldpassword: '', password: '', confirmpassword: '', submit: '' })
    const [oldpassword, setOldPassword] = useState(false)
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        getenptoken()
            .then(res => {
                if (res.data.err === 0) {
                    sessionStorage.setItem('enpstd', res.data.token)
                }
            })
            .catch(err => console.log('err connecting server'))
        return () => {
            sessionStorage.removeItem('enpstd')
        }
    }, [])

    function handler(e) {
        let n = e.target.name
        let v = e.target.value
        setData({ ...data, [n]: v })
        !regExpPass.test(v) ? setErrors({ ...errors, [n]: "Not a valid Password" }) : setErrors({ ...errors, [n]: "" })
        console.log(n, e.target.value)
    }

    const submit = () => {
        if (data.password != data.confirmpassword) {
            setErrors({ ...errors, 'password': 'Password does not match', 'confirmpassword': 'Password does not match' })
            setSpinner(false)
        }
        else {
            setErrors({ ...errors, 'password': '', 'confirmpassword': '' })
            let temp = Object.keys(errors)
            temp.pop()
            let count = temp.reduce((sum, ele) => sum + errors[ele].length, 0)
            if (count === 0) {
                let t = Object.keys(data)
                let count2 = t.reduce((sum, ele) => { if (data[ele].length === 0) { return sum + 1 } return sum }, 0)
                if (count2 === 0) {
                    let tmp = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
                    let tmp2 = { ...data }
                    delete tmp2.confirmpassword
                    tmp2.email = jwt_decode(sessionStorage.getItem('_token')).email
                    console.log(data)
                    let send = CryptoJS.AES.encrypt(JSON.stringify(tmp2), tmp).toString();
                    changepassword({ data: send })
                        .then(res => {
                            if (res.data.err === 0) {
                                alert('password changed successfully');
                                setSpinner(false)
                                setErrors({ ...errors, 'submit': '' })
                                console.log("PASSWORD CHANGED")
                            }
                            else {
                                setErrors({ ...errors, 'submit': res.data.msg })
                                setSpinner(false)
                            }
                        })
                        .catch(err => { console.log(err); setSpinner(false) })
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


    return (
        <Container>
            <div className="login" >
                {jwt_decode(sessionStorage.getItem('_token')).isSocialLogin ?
                    <h5 className="p-4 box-shadow" style={{ borderRadius: '10px' }}>Sorry cannot change password , our system has detected you are logged in using third party.</h5>
                    :
                    <Form style={{ width: '50vw', marginBottom: '20px', textAlign: 'center' }}>
                        <h2>Change Password</h2><hr />
                        <Form.Group>
                            <InputGroup>
                                <FormControl name="oldpassword" placeholder="Old Password" type={oldpassword ? "text" : "password"} onChange={handler} />
                                {oldpassword ?
                                    <BsEyeFill className="iconlogin" onClick={() => setOldPassword(false)} />
                                    :
                                    <BsEyeSlashFill className="iconlogin" onClick={() => setOldPassword(true)} />
                                }
                            </InputGroup>
                            <p className="errors text-start">{errors.oldpassword}</p>
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
                            <p className="errors text-start">{errors.password}</p>
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
                            <p className="errors text-start">{errors.confirmpassword}</p>
                        </Form.Group>
                        <Button onClick={() => { setSpinner(true); submit() }} disable={spinner}>{spinner && <Spinner animation="border" size="sm" />}   Submit</Button>
                        <p className="errors m-0">{errors.submit}</p>
                    </Form>
                }
            </div>
        </Container>
    )
}
