import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import CryptoJS from 'crypto-js'
import { getenptoken, changepassword } from '../config/Myservice'
import { useNavigate } from 'react-router-dom'
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

export default function ChangePassword() {
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
        console.log(n, e.target.value)
    }

    const changepassword = () => {
        let tmp = jwt_decode(sessionStorage.getItem('enpstd')).enpstd
        let tmp2 = data
        delete tmp2.confirmpassword
        tmp2.email = jwt_decode(sessionStorage.getItem('_token')).email
        console.log(tmp2)
        let send = CryptoJS.AES.encrypt(JSON.stringify(tmp2), tmp).toString();
        changepassword({ data: send })
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
                    <h2>Change Password</h2><hr />
                    <Form.Group>
                        <InputGroup>
                            <FormControl name="password" placeholder="Old Password" type={oldpassword ? "text" : "password"} onChange={handler} />
                            {oldpassword ?
                                <BsEyeFill className="iconlogin" onClick={() => setOldPassword(false)} />
                                :
                                <BsEyeSlashFill className="iconlogin" onClick={() => setOldPassword(true)} />
                            }
                        </InputGroup>
                        <p style={styled}>{errors.oldpassword}</p>
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
                    <Button onClick={() => changepassword()}>Submit</Button>
                    <p style={styled}>{errors.submit}</p>
                </Form>
            </div>
        </Container>
    )
}
