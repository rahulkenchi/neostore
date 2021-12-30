import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
export default function Footer() {
    return (<>
        <div className="customneofooter">
            <div>
                <h3>About Company</h3>
                <ul>
                    <li><p>Neosoft Technologies is here at your quick and easy<br />for shopping.</p></li>
                    <li>Contact information</li>
                    <li>Email: contact@neosoftmail.com</li>
                    <li>Phone: +91 0000000000</li>
                    <li>MUMBAI,INDIA</li>
                </ul>
            </div>
            <div>
                <h3>information</h3>
                <ul >
                    <li>Terms and Conditions</li>
                    <li>Gurantee and Return Policy</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                    <li>Locate Us</li>
                    <li><a href="mailto: rahulskenchi0@gmail.com?subject = Feedback&body = Message">Send Email</a></li>
                </ul>
            </div>
            <div>
                <h3>Newsletter</h3>
                <ul>
                    <li>Signup to get exclusive offer from our favorite brands and to be well up in the news.</li>
                    <br />
                    <li>
                        <Form className="d-flex">
                            <FormControl
                                type="email"
                                placeholder="your email..."
                                className="me-2 ms-2"
                                aria-label="your email..."
                            />
                        </Form></li>
                    <br />
                    <li><Button variant="light">Subscribe</Button></li>
                </ul>
            </div>
        </div>
        <p style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', wordBreak: 'break-word', margin: '0', borderBottom: '3px solid grey', paddingBottom: '15px' }}>Copyright 2017 NeoSOFT Technologies All rights reserved | Design By Rahul Kenchi</p>
    </>
    )
}
