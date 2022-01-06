import React, { useState, useEffect } from 'react'
import { MdAccountBox } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useNavigate, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, Form, Button, FormControl, NavDropdown } from 'react-bootstrap'

export default function NavigationBar() {
    const navigate = useNavigate()
    return (
        <Navbar bg="dark" expand="lg" >
            <Container fluid >
                <Navbar.Brand style={{ color: 'white', fontSize: 'x-large', margin: ' auto 5vw' }}>Neo<span style={{ color: 'red', fontWeight: 'bold' }}>STORE</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className="text-white" ><NavLink to="/">Home</NavLink></Nav.Link>
                    </Nav>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className="text-white"><NavLink to="/product">Product</NavLink></Nav.Link>
                    </Nav>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className="text-white"><NavLink to="/myaccount/order">Order</NavLink></Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div style={{ backgroundColor: 'white', width: '70px', height: '40px', borderRadius: '5px' }}>
                            <NavLink to="/cart"><p className="d-flex justify-content-center align-items-center h-100 m-0"  >
                                <FaShoppingCart style={{ fontSize: 'large' }} />
                                <span style={{ position: 'relative', bottom: '10px', borderRadius: '50%', fontWeight: 'bold', fontSize: 'small', backgroundColor: '#ff1656', color: 'white', padding: '0px 2px' }}>01</span>
                                Cart</p></NavLink>
                        </div>
                    </Nav>
                    <NavDropdown
                        title={<MdAccountBox style={{ backgroundColor: 'white', color: 'black', width: '30px', height: '27px' }} />}
                        id="navbarScrollingDropdown"
                        style={{ marginRight: '7vw', width: '70px', height: '40px', backgroundColor: "white", borderRadius: '5px' }}>
                        <NavDropdown.Item ><NavLink to="/myacount">My Account</NavLink></NavDropdown.Item>
                        <NavDropdown.Item ><NavLink to="/myaccount/profile">Profile</NavLink></NavDropdown.Item>
                        <NavDropdown.Item >Signout&nbsp;&nbsp;<RiLogoutCircleRLine /></NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    )
}
