import React, { useState, useEffect } from 'react'
import { getsearch } from '../config/Myservice'
import { MdAccountBox } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { BsClock } from 'react-icons/bs'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Container, Nav, Form, Button, FormControl, NavDropdown, Collapse } from 'react-bootstrap'

export default function NavigationBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartcount = useSelector(state => state.cartReducer)
    const [searchList, setSearchList] = useState([])
    const [show, setShow] = useState(false)
    useEffect(() => {
        console.log(searchList)
    }, [searchList])

    const search = (searchvalue) => {
        if (searchvalue.length > 0) {
            getsearch({ 'data': searchvalue })
                .then(res => {
                    setSearchList(res.data)
                })
                .catch(err => console.log(err))
        }
        else {
            setSearchList([])
        }
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
                            <Form className="d-flex">
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onMouseOver={() => setShow(true)}
                                    onChange={(e) => search(e.target.value)}
                                    onFocus={() => setShow(true)}
                                    onBlur={() => setShow(false)}
                                    aria-expanded={show}
                                    aria-controls="example-collapse-text"
                                />
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
                            <NavDropdown.Item to="/myaccount">My Account</NavDropdown.Item>
                            <NavDropdown.Item to="/myaccount">Profile</NavDropdown.Item>
                            <NavDropdown.Item to="/">Signout&nbsp;&nbsp;<RiLogoutCircleRLine /></NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
            <Collapse in={show} style={{ maxHeight: '150px', overflow: 'auto' }}>
                <div>
                    {
                        searchList.map(ele =>
                            <p><BsClock />   {ele.product_name}</p>
                        )
                    }
                </div>
            </Collapse>
        </>
    )
}
