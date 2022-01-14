import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { getaddress, setaddress } from '../config/Myservice'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
export default function Checkout() {
    const navigate = useNavigate()
    const [address, setAddress] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('_token') != undefined) {
            let email = jwt_decode(sessionStorage.getItem('_token')).email
            getaddress({ 'email': email })
                .then(res => {
                    setAddress(res.data.address)
                    // console.log(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    const del = (index) => {
        let tmp = address
        tmp.splice(index, 1)
        let email = jwt_decode(sessionStorage.getItem('_token')).email
        setaddress({ email: email, address: tmp })
            .then(res => {
                if (res.data.err === 0) {
                    setAddress([...tmp])
                }
                else {
                    alert('error deleting address')
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
            <h2 className='fw-bolder'>Addresses</h2>
            <hr />
            {
                address.map((ele, index) =>
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <Card.Text className="d-flex">
                                <p className='w-100'>
                                    {ele.address}<br />
                                    {ele.city}, {ele.pincode}<br />
                                    {ele.state}<br />
                                    {ele.country}<br />
                                </p>
                                <p><Button variant='danger' onClick={() => del(index)} className="fw-bold">X</Button></p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            }
            <hr /><br />
            <p><Button variant="light" onClick={() => navigate("/myaccount/addnewaddress")} className="fw-bold" >Add Address</Button></p>
        </div>
    )
}
