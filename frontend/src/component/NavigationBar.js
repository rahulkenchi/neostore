import React, { useState, useEffect } from 'react'
import { MdAccountBox } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { Navbar, Container, Nav, Form, Button, FormControl, NavDropdown } from 'react-bootstrap'

export default function NavigationBar() {

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
                        <Nav.Link href="#action1" style={{ color: 'white' }}>Home</Nav.Link>
                    </Nav>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" style={{ color: 'white' }}>Products   </Nav.Link>
                    </Nav>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" style={{ color: 'white' }}>Order</Nav.Link>
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
                        <div style={{ backgroundColor: 'white', width: '70px', height: '40px', borderRadius: '5px', padding: '0', verticalAlign: 'center', justifyContent: 'center' }}><p style={{ padding: '5px', margin: '0' }}><FaShoppingCart style={{ fontSize: 'large' }} />&nbsp; Cart</p></div>
                    </Nav>
                    <NavDropdown title={<MdAccountBox style={{ backgroundColor: 'white', color: 'black', width: '30px', height: '27px' }} />} id="navbarScrollingDropdown" style={{ marginRight: '7vw', width: '70px', height: '40px', backgroundColor: "white", borderRadius: '5px' }}>
                        <NavDropdown.Item >My Account</NavDropdown.Item>
                        <NavDropdown.Item >Profile</NavDropdown.Item>
                        <NavDropdown.Item >Signout&nbsp;&nbsp;<RiLogoutCircleRLine /></NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    )
}
