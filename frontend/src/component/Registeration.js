import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { MdPhone, MdInfo } from 'react-icons/md'
import { Container, Form, FormControl, InputGroup, Button } from 'react-bootstrap'
const regExpName = new RegExp(/^[a-zA-Z]{2,20}$/)
const regExpEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const regExpPass = new RegExp(/^[a-zA-Z]{8,20}$/)
const regMobile = new RegExp(/^[987][0-9]{9}$/)

const styled = {
    margin: 0,
    fontSize: 'small',
    color: 'red'
}
export default function Registeration() {
    const navigate = useNavigate()
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', confirm_password: ' ', mobile: '', gender: '' })
    const [errors, setErrors] = useState({ firstname: '', lastname: '', email: '', password: '', confirm_password: '', mobile: '', gender: 'not selected', submit: '' })

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
        else if (n === "password" || n === "confirm_password") {
            !regExpPass.test(v) ? setErrors({ ...errors, [n]: "Not a valid Password" }) : setErrors({ ...errors, [n]: "" })
        }
        else if (n === "gender") {
            setErrors({ ...errors, [n]: "" })
        }
        if (errors.submit.length != 0) { setErrors({ ...errors, submit: '' }) }
        setData({ ...data, [n]: v })
    }

    const register = () => {
        let tmp = Object.keys(errors)
        tmp.pop()
        let count = tmp.reduce((sum, ele) => sum + errors[ele].length, 0)
        if (count === 0) {
            let t = Object.keys(data)
            let count2 = t.reduce((sum, ele) => { if (data[ele].length === 0) { console.log(ele); return sum + 1 } return sum }, 0)
            if (count2 === 0) {
                let send = data
                delete send.confirm_password
                axios.post("http://localhost:9999/registration", send)
                    .then(res => {
                        switch (res.data.err) {
                            case 0: navigate("/login")
                                break;
                            case 1: console.log(res.data.msg)
                                break;
                            case 2: console.log(res.data.msg)
                                break;
                        }
                    })
                    .catch(err => {
                        alert("error connecting registering user please try again later.")
                    })
            }
            else if (count2 != 0) {
                setErrors({ ...errors, submit: 'Some fields are empty' })
            }
        }
        else if (count != 0) {
            setErrors({ ...errors, submit: 'Some fields are empty' })
        }
    }

    return (
        <Container>
            <Form className="registration" >
                <h3>Register to NeoSTORE</h3>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="text" placeholder="First Name" name="firstname" onChange={handler} />
                        {/* change icon here */}
                    </InputGroup>
                    <p style={styled}>{errors.firstname}</p>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="text" placeholder="Last Name" name="lastname" onChange={handler} />
                    </InputGroup>
                    <p style={styled}>{errors.lastname}</p>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="email" placeholder="Email Address" name="email" onChange={handler} />
                        <IoMdMail className="iconlogin" />
                    </InputGroup>
                    <p style={styled}>{errors.email}</p>

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
                    <p style={styled}>{errors.password}</p>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type={showconfirmpassword ? "text" : "password"} placeholder="Confirm Password" name="confirm_password" onChange={handler} />
                        {showconfirmpassword ?
                            <BsEyeFill className="iconlogin" onClick={() => setShowConfirmPassword(false)} />
                            :
                            <BsEyeSlashFill className="iconlogin" onClick={() => setShowConfirmPassword(true)} />
                        }
                    </InputGroup>
                    <p style={styled}>{errors.confirm_password}</p>
                </Form.Group>
                <Form.Group>
                    <InputGroup>
                        <FormControl type="text" placeholder="Mobile No." name="mobile" onChange={handler} />
                        <MdPhone className="iconlogin" />
                    </InputGroup>
                    <p style={styled}>{errors.mobile}</p>
                </Form.Group>
                <Form.Group>
                    <input type='radio' value="Male" name="gender" onChange={handler} /><label>Male</label>
                    <input type='radio' value="Female" name="gender" onChange={handler} /><label>Female</label>
                </Form.Group>
                <p style={styled}>{errors.gender}</p>
                <Button onClick={() => register()}>Register</Button>
                <p style={styled}>{errors.submit}</p>
            </Form>
        </Container>
    )
}
