import React, { useEffect, useState } from 'react'
import { updateprofile } from '../config/Myservice'
import jwt_decode from 'jwt-decode'
import { MdSave } from 'react-icons/md'
import { MdModeEditOutline } from 'react-icons/md'
import { Button, Row, Col, Modal, Form } from 'react-bootstrap'

export default function Profile() {
    const [data, setData] = useState({})
    const [modalShow, setModalShow] = useState(false);
    const [updatedData, setUpdatedData] = useState({})

    useEffect(() => {
        if (sessionStorage.getItem('_token')) {
            setData(jwt_decode(sessionStorage.getItem('_token')))
        }
        else {
            console.log("user not logged in")
        }
    }, [])

    const handler = (e) => {
        e.preventDefault()
        console.log(modalShow)
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
    }

    const profilesave = () => {
        let tmp = updatedData
        tmp.email = data.email
        console.log(tmp)
        updateprofile({ 'data': tmp })
            .then(res => {
                if (res.data.err === 0) {
                    setModalShow(false)
                }
                else {
                    alert('data failed to update')
                }
            })
    }

    return (
        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
            <h2>Profile</h2>
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
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Last Name</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.lastname} onChange={handler} name="lastname" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Gender</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.gender} onChange={handler} name="gender" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={3}><b>Mobile Number</b></Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder={data.mobile} onChange={handler} name="mobile" />
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
                <Modal.Footer>
                    <Button variant="primary" onClick={() => profilesave()}><MdSave style={{ fontSize: 'x-large' }} />   Save</Button>
                    <Button variant="outline-danger" onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}
