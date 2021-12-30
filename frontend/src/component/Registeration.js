import React, { useState } from 'react'
import { IoMdMail } from 'react-icons/io'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { MdPhone, MdInfo } from 'react-icons/md'
import { Container, Form, FormControl, InputGroup, Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
const styled = {
    margin: 0,
    fontSize: 'small'
}
export default function Registeration() {
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', confirm_password: '', mobile: '', gender: '' })
    const [errors, setErrors] = useState({ firstname: '', lastname: '', email: '', password: '', confirm_password: '', mobile: '', gender: '' })

    function handler(e) {
        console.log(e.target.name, e.target.value)
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
                <p style={{ styled }}>{errors.gender}</p>
                <Button>Register</Button>
            </Form>
        </Container>
    )
}
