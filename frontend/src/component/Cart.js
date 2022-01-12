import React, { useEffect, useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import { Button, Row, Col } from 'react-bootstrap'


export default function Cart() {

    return (
        <div>
            <h5 className="d-flex w-100 justify-content-around">
                <span>Cart</span>
                <hr className='w-75' />
                <span>Delivery Address</span>
            </h5>
            <div className="d-flex justify-content-around">
                <div className="d-grid" style={{ width: '70%' }}>
                    <Row>
                        <Col sm={5} md={5} lg={5}>Product</Col>
                        <Col sm={2} md={2} lg={2}>Quantity</Col>
                        <Col sm={2} md={2} lg={2}>Price</Col>
                        <Col sm={2} md={2} lg={2}>Total</Col>
                        <Col sm={1} md={1} lg={1}></Col>
                    </Row>
                    {[0, 1].map((ele, index) =>
                        <Row key={index}>
                            <Col sm={5} md={5} lg={5}>Product</Col>
                            <Col sm={2} md={2} lg={2}>Quantity</Col>
                            <Col sm={2} md={2} lg={2}>Price</Col>
                            <Col sm={2} md={2} lg={2}>Total</Col>
                            <Col sm={1} md={1} lg={1}><MdOutlineDelete style={{ fontSize: 'x-large', color: 'red' }} /></Col>
                        </Row>
                    )}
                </div>
                <div className="p-3">
                    <h3>Review Order</h3>
                    <p>Subtotal<span>15999</span></p>
                    <hr />
                    <p>GST(5%)<span>8000</span></p>
                    <hr />
                    <p>Order Total<span>176764</span></p>
                    <Button variant="primary" className="w-100">Proceed to Buy</Button>
                </div>
            </div>
        </div >
    )
}
