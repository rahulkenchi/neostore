import React, { useState, useEffect } from 'react'
import { getsearch } from '../config/Myservice'
import { MdAccountBox } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { GrSearch } from 'react-icons/gr'
import { BsClock } from 'react-icons/bs'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Container, Nav, Form, Button, FormControl, NavDropdown, Collapse, InputGroup } from 'react-bootstrap'

export default function NavigationBar() {
    const navigate = useNavigate()
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
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/" className="text-white" >Home</Nav.Link>
                        </Nav>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/product" className="text-white">Product</Nav.Link>
                        </Nav>
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/myaccount/order" className="text-white">Order</Nav.Link>
                        </Nav>
                        <Nav>
                            <Form className="d-flex position-relative">
                                <InputGroup>
                                    <Form.Group>
                                        <GrSearch style={{ left: '20px' }} />
                                        <FormControl
                                            type="text"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
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
                                                            <p className="" onClick={() => navigate(`/productdetail?id=${ele._id}`)}>&nbsp;{ele.product_name}</p>
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
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <div style={{ backgroundColor: 'white', width: '70px', height: '40px', borderRadius: '5px', position: 'relative' }}>
                                <NavLink to="/cart"><p className="d-flex justify-content-center align-items-center h-100 m-0 navbarclass"  >
                                    <FaShoppingCart style={{ fontSize: 'large' }} />
                                    <span style={{ position: 'absolute', top: '0px', borderRadius: '50%', fontWeight: 'bold', fontSize: 'small', backgroundColor: '#ff1656', color: 'white', padding: '0px 2px', left: '20px' }}>{cartcount == 0 ? "" : cartcount}</span>
                                    &nbsp;&nbsp;Cart</p></NavLink>
                            </div>
                        </Nav>
                        <NavDropdown
                            className="navbarclass"
                            title={<MdAccountBox style={{ backgroundColor: 'white', color: 'black', width: '30px', height: '27px' }} />}
                            id="navbarScrollingDropdown"
                            style={{ marginRight: '7vw', width: '70px', height: '40px', backgroundColor: "white", borderRadius: '5px' }}>
                            <NavDropdown.Item><NavLink to="/myaccount">My Account</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink to="/myaccount">Profile</NavLink></NavDropdown.Item>
                            <NavDropdown.Item onClick={() => signout()}>Signout&nbsp;&nbsp;<RiLogoutCircleRLine /></NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container >
                {/* <Collapse className="position-absolute" style={{ top: '500px', left: '500px' }} in={show} style={{ maxHeight: '150px', overflow: 'auto' }}>
                    <div>
                        {
                            searchList.map(ele =>
                                <p><BsClock />   {ele.product_name}</p>
                            )
                        }
                    </div>
                </Collapse> */}
            </Navbar >
        </>
    )
}
