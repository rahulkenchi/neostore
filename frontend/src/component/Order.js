import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { getorder } from '../config/Myservice'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Order() {
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)

    useEffect(async () => {
        console.log(jwt_decode(sessionStorage.getItem('_token')).email)
        await getorder({ email: jwt_decode(sessionStorage.getItem('_token')).email })
            .then(res => {
                console.log(res.data.order)
                if (res.data.err === 0) {
                    setOrder(res.data.order)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const pdf = (ele) => {
        navigate("/invoice", { state: ele })
    }

    return (
        <div>
            {order && order.map((ele, index) =>
                <Card key={index} >
                    <Card.Body>
                        <Card.Title><b style={{ color: "orange" }}>TRANSIT</b> Order By :  {ele.buyer}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Placed on :{ele.date.slice(0, 10).replace(/-/g, '/')} /    <span className="text-success">  <i className="fa fa-inr"></i>{ele.total}</span></Card.Subtitle>
                        <hr />
                        <Card.Text className="d-flex overflow-auto">
                            {
                                ele.orderlist.map((ele) =>
                                    <img className="m-1" loading="lazy" alt='could not load images' width="150px" height="auto" src={`http://localhost:3000/product_images/${ele.product_image}`} />
                                )
                            }
                        </Card.Text>
                        <hr /><br />
                        <Button variant="primary" onClick={() => pdf(ele)}>Download Invoice as PDF</Button>
                    </Card.Body>
                </Card>
            )}
            {order && order.length === 0 && <Card className="box-shadow p-3"><Card.Text><h6>No Orders Found. <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate("/product")}>Order Now</span> ?</h6></Card.Text></Card>}
        </div >
    )
}
