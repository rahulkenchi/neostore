import React from 'react'
import { Button } from 'react-bootstrap'
export default function Footer() {
    return (
        <div style={{ backgroundColor: 'black', textAlign: 'center', color: 'white', display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '30vw' }}>
                <h3>About Company</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                    <li><p>Neosoft Technologies is here at your quick and easy<br />for shopping.</p></li>
                    <li>Contact information</li>
                    <li>Email: contact@neosoftmail.com</li>
                    <li>Phone: +91 0000000000</li>
                    <li>MUMBAI,INDIA</li>
                </ul>
            </div>
            <div style={{ width: '30vw' }}>                <h3>information</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                    <li>Terms and Conditions</li>
                    <li>Gurantee and Return Policy</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                    <li>Locate Us</li>
                </ul>
            </div>
            <div style={{ width: '30vw' }}>
                <h3>Newsletter</h3>
                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                    <li>Signup to get exclusive offer from our favorite brands and to be well up in the news.</li>
                    <br />
                    <li><input type="email" placeholder="your email..." width="auto" /></li>
                    <br />
                    <li><Button variant="light">Subscribe</Button></li>
                </ul>
            </div>
        </div>
    )
}
