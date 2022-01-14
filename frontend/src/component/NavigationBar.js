import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { getsearch, setcart } from '../config/Myservice'
import { MdAccountBox } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { GrSearch } from 'react-icons/gr'
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Container, Nav, Form, Button, FormControl, NavDropdown, Collapse, InputGroup } from 'react-bootstrap'

export default function NavigationBar() {
    const navigate = useNavigate()
    const params = useParams()
    const [inputtext, setInputText] = useState('')
    const cartcount = useSelector(state => state.cartReducer)
    const [searchList, setSearchList] = useState([])
    const [show, setShow] = useState(false)

    const search = (searchvalue) => {
        if (searchvalue.length > 0) {
            getsearch({ 'data': searchvalue })
                .then(res => {
                    if (res.data.length != 0) {
                        setSearchList(res.data)
                        // console.log(res.data)
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            setSearchList([])
        }
    }

    const signout = () => {
        let data = JSON.parse(localStorage.getItem('cart'))
        // setcart({ 'email': jwt_decode(sessionStorage.getItem('_token')).email, 'cart': data })
        localStorage.removeItem('cart')
        sessionStorage.removeItem('_token')
        navigate("/")
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" >
                <Container fluid >
                    <Navbar.Brand style={{ color: 'white', fontSize: 'x-large', margin: ' auto 5vw' }}>Neo<strong style={{ color: 'red' }}>STORE</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 anchor"
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/" className="text-white" >Home</Nav.Link>
                        </Nav>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/product" className="text-white">Product</Nav.Link>
                        </Nav>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/myaccount/order" className="text-white">Order</Nav.Link>
                        </Nav>
                        <Nav>
                            <Form className="d-flex position-relative">
                                <InputGroup>
                                    <Form.Group>
                                        <GrSearch style={{ position: 'absolute', top: '10px', left: '10px' }} />
                                        <FormControl
                                            style={{ paddingLeft: '30px' }}
                                            type="text"
                                            placeholder="Search"
                                            className="me-2"
                                            aria- label="Search"
                                            onChange={(e) => { search(e.target.value); setInputText(e.target.value) }}
                                            onFocus={() => setShow(true)}
                                            onBlur={() => setShow(false)}
                                            aria-expanded={show}
                                            aria-controls="example-collapse-text"
                                        />
                                        {inputtext.length > 0 &&
                                            <Collapse className="position-absolute p-3 w-100" in={show} >
                                                <div style={{ maxHeight: '25vh', overflow: 'auto', backgroundColor: `white`, zIndex: 1 }}>
                                                    {
                                                        searchList.map(ele =>
                                                            <p className="" onClick={() => { navigate(`/productdetail?id=${ele._id}`) }}>&nbsp;{ele.product_name}</p>
                                                        )
                                                    }
                                                </div>
                                            </Collapse>
                                        }
                                    </Form.Group>
                                </InputGroup>
                            </Form>
                        </Nav>
                        <Nav
                            className="mx-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <NavLink to="/cart">
                                <div className="d-flex align-items-center justify-content-center bg-white position-relative" style={{ width: '70px', height: '38px', borderRadius: '5px' }}>
                                    <FaShoppingCart className="fs-5" />
                                    {cartcount == 0 ? "" :
                                        <span className="position-absolute  fw-bold text-white"
                                            style={{
                                                top: '0px', borderRadius: '50%', fontSize: '12px',
                                                backgroundColor: '#ff1656', padding: '1px 3px', left: '21px'
                                            }}>
                                            {cartcount}
                                        </span>
                                    }
                                    &nbsp;&nbsp;Cart
                                </div>
                            </NavLink>
                        </Nav>
                        <NavDropdown
                            className="d-flex align-items-center justify-content-center bg-white"
                            title={<MdAccountBox style={{ color: 'black', width: '30px', height: '27px' }} />}
                            id="navbarScrollingDropdown"
                            style={{ marginRight: '7vw', width: '70px', height: '38px', borderRadius: '5px' }}>
                            <NavDropdown.Item><NavLink to="/myaccount">My Account</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink to="/myaccount">Profile</NavLink></NavDropdown.Item>
                            <NavDropdown.Item onClick={() => signout()}>Signout&nbsp;&nbsp;<RiLogoutCircleRLine /></NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </>
    )
}
