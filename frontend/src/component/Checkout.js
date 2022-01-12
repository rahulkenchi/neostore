import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
export default function Checkout() {
    const navigate = useNavigate()
    return (
        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
            <h2 style={{ fontWeight: 'bolder' }}>Addresses</h2>
            <hr />
            {
                [0, 1, 2].map((ele, index) =>
                    <Card key={index} className="mb-3">
                        <Card.Body>
                            <Card.Text className="d-flex">
                                <p className='w-100'>
                                    302 Abhishek Avenue<br />
                                    Indore-452010<br />
                                    India
                                </p>
                                <p><Button variant='danger' style={{ fontWeight: 'bold' }}>X</Button></p>
                            </Card.Text>
                            <Button variant="primary" className="px-3 ">Edit</Button>
                        </Card.Body>
                    </Card>
                )
            }
            <hr /><br />
            <p><Button variant="light" onClick={() => navigate("/myaccount/addnewaddress")} style={{ fontWeight: 'bold' }} >Add Address</Button></p>
        </div>
    )
}
