import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { getorder, setcart } from '../config/Myservice'
import { Card, Button } from 'react-bootstrap'

export default function Order() {
    const [order, setOrder] = useState()

    useEffect(async () => {
        await getorder({ email: jwt_decode(sessionStorage.getItem('_token')).email })
            .then(res => {
                if (res.data.err === 0) {
                    setcart(res.data.order)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>

            {order && order.map((ele, index) =>
                <Card key={index} style={{}}>
                    <Card.Body>
                        <Card.Title><b style={{ color: "orange" }}>TRANSIT</b> Order By:{order.buyer}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Placed on :{order.date}</Card.Subtitle>
                        <hr />
                        <Card.Text>
                            {order.orderlist.map((ele) =>
                                <img loading="lazy" alt='could not load images' width="150px" height="auto" src={`http://localhost:3000/product_images/${ele.product_image}`} />
                            )}
                        </Card.Text>
                        <hr /><br />
                        <Button variant="primary">Download Invoice as PDF</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
