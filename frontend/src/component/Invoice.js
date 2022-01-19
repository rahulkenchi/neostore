import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Pdf from 'react-to-pdf';
const ref = React.createRef();

export default function Invoice() {
    const location = useLocation()
    const [data, setData] = useState()

    useEffect(() => {
        console.log(location.state)
        if (location.state != undefined) {
            setData(location.state)
        }
    }, [location.state])

    return (
        <div >
            {data && <>
                <Container className="p-4 w-75 box-shadow" style={{ borderRadius: '10px' }}>
                    <div ref={ref} className="p-5">
                        <Row>
                            <Col>
                                <h3><b>Neo<span style={{ color: 'red' }}>Store</span></b></h3>
                                <p>
                                    Order Id : - {data._id}<br />
                                    Bill To : - {data.buyer}<br />
                                    Address :- {data.address.address} , {data.address.city} ,{data.address.state} ,{data.address.country}, Pincode - {data.address.pincode}<br />
                                    Date :- {data.date.slice(0, 10).replace(/-/g, '/')}
                                </p>
                            </Col>
                            <Col>
                                <h3 className="text-end">Invoice</h3>
                            </Col>
                        </Row>
                        <hr />
                        <Table  >
                            <thead>
                                <tr>
                                    <th>Sr.NO</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.orderlist.map((ele, index) =>
                                        <tr key={ele._id}>
                                            <td>{index + 1}</td>
                                            <td><img width="30px" height="30px" src={`/product_images/${ele.product_image}`} alt="no_image" />
                                                {ele.product_name}
                                            </td>
                                            <td>{ele.product_cost}</td>
                                            <td>{ele.product_quantity}</td>
                                            <td>{ele.product_cost * ele.product_quantity}</td>
                                        </tr>
                                    )
                                }
                                <tr >
                                    <td colSpan={4} className="text-end fw-2"><span style={{ fontSize: '10px' }}>(including GST)</span>Total</td>
                                    <td>{data.total} <i className="fa fa-inr"></i></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <p className="text-center m-0">
                        <Pdf targetRef={ref} filename={`${data._id}.pdf`} scale={0.75}>
                            {({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}>Generate Pdf</button>}
                        </Pdf>
                    </p>
                </Container>

            </>
            }
        </div>
    )
}
