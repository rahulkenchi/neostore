import React, { useEffect, useState } from 'react'
import { updateprofile } from '../config/Myservice'
import jwt_decode from 'jwt-decode'
import { MdSave } from 'react-icons/md'
import { MdModeEditOutline } from 'react-icons/md'
import { Button, Row, Col, Modal, Form, Spinner } from 'react-bootstrap'
const regExpName = new RegExp(/^[a-zA-Z]{2,20}$/)
const regMobile = new RegExp(/^[987][0-9]{9}$/)

export default function Profile() {
    const [spinner, setSpinner] = useState(false)
    const [data, setData] = useState({ firstname: '', lastname: '', mobile: '', gender: '', email: '' })
    const [errors, setErrors] = useState({ firstname: '', lastname: '', mobile: '', gender: 'not selected', submit: '' })
    const [modalShow, setModalShow] = useState(false);
    const [updatedData, setUpdatedData] = useState({ firstname: '', lastname: '', mobile: '', gender: '' })

    useEffect(() => {
        if (sessionStorage.getItem('_token')) {
            setData(jwt_decode(sessionStorage.getItem('_token')))
        }
        else {
            console.log("user not logged in")
        }
    }, [])

    useEffect(() => {
        setUpdatedData({ firstname: '', lastname: '', mobile: '', gender: '' })
        setErrors({ firstname: '', lastname: '', mobile: '', gender: 'not selected', submit: '' })
        setSpinner(false)
    }, [modalShow])

    const handler = (e) => {
        let n = e.target.name
        let v = e.target.value
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
        if (n === "firstname" || n === "lastname") {
            !regExpName.test(v) ? setErrors({ ...errors, [n]: "Not a valid Name" }) : setErrors({ ...errors, [n]: "" })
        }
        else if (n === "mobile") {
            !regMobile.test(v) ? setErrors({ ...errors, [n]: "Not a valid Mobile" }) : setErrors({ ...errors, [n]: "" })
        }
        else if (n === "gender") {
            setErrors({ ...errors, [n]: "" })
        }
        if (errors.submit.length != 0) { setErrors({ ...errors, submit: '' }) }
    }

    const profilesave = () => {
        let tmp = Object.keys(errors)
        tmp.pop()
        let count = tmp.reduce((sum, ele) => sum + errors[ele].length, 0)
        if (count === 0) {
            let t = Object.keys(updatedData)
            let count2 = t.reduce((sum, ele) => { if (updatedData[ele].length === 0) { return sum + 1 } return sum }, 0)
            if (count2 === 0) {
                let temp = updatedData
                temp.email = data.email
                console.log(temp, count2, count)
                updateprofile({ 'data': temp })
                    .then(res => {
                        if (res.data.err === 0) {
                            sessionStorage.setItem('_token', res.data.token);
                            setModalShow(false)
                            setData(jwt_decode(sessionStorage.getItem('_token')))
                        }
                        else {
                            alert(res.data.msg)
                        }
                        setSpinner(false);
                    })
                    .catch(err => {
                        alert("error connecting registering user please try again later.");
                        setSpinner(false);
                    })
            }
            else if (count2 != 0) {
                console.log("Count2", count2)
                setErrors({ ...errors, submit: 'Some fields are empty' })
                setSpinner(false)
            }
        }
        else if (count != 0) {
            console.log("Count", count)
            setErrors({ ...errors, submit: 'Some fields are empty' })
            setSpinner(false)
        }
    }

    return (
        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
            <h2>Profile</h2>{console.log(updatedData, "OK", spinner, "ERR", errors)}
            <hr />
            <div>
                <Row>
                    <Col md={3} lg={3}><b>First Name</b></Col>
                    <Col>{data.firstname}</Col>
                </Row>
                <Row>
                    <Col md={3} lg={3}><b>Last Name</b></Col>
                    <Col>{data.lastname}</Col>
                </Row>
                <Row>
                    <Col md={3} lg={3}><b>Gender</b></Col>
                    <Col>{data.gender}</Col>
                </Row>
                <Row>
                    <Col md={3} lg={3}><b>Mobile Number</b></Col>
                    <Col>{data.mobile}</Col>
                </Row>
                <Row>
                    <Col md={3} lg={3}><b>Email</b></Col>
                    <Col>{data.email}</Col>
                </Row>
            </div>
            <hr />
            <p><Button variant="light" onClick={() => setModalShow(true)}><MdModeEditOutline style={{ fontSize: 'large', marginRight: '5px' }} />Edit</Button></p>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3} lg={3}><b>First Name</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.firstname} onChange={handler} name="firstname" />
                                <p className="errors">{errors.firstname}</p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Last Name</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.lastname} onChange={handler} name="lastname" />
                                <p className="errors">{errors.lastname}</p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Gender</b></Col>
                        <Col>
                            <Form.Group>
                                <input type='radio' value="Male" id="gender1" name="gender" onChange={handler} /><label for="gender1">Male</label>
                                <input type='radio' value="Female" id="gender2" name="gender" onChange={handler} /><label for="gender2">Female</label>
                                <p className="errors">{errors.gender}</p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Mobile Number</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.mobile} onChange={handler} name="mobile" />
                                <p className="errors">{errors.mobile}</p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Email:</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.email} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className='position-relative mb-3'>
                    <Button variant="primary" onClick={() => { setSpinner(true); profilesave() }} disabled={spinner}>{spinner && <Spinner animation="border" size="sm" />} <MdSave style={{ fontSize: 'x-large' }} />   Save</Button>
                    <Button variant="outline-danger" onClick={() => setModalShow(false)}>Close</Button>
                    <span className='errors position-absolute' style={{ bottom: '-5px', right: '45px' }}>{errors.submit}</span>
                </Modal.Footer>
            </Modal >
        </div >
    )
}
