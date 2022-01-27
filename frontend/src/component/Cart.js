import React, { useEffect, useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md'
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi'
import { Button, Row, Col, Alert } from 'react-bootstrap'
import { getcart } from '../config/Myservice'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alert, setAlert] = useState({ error: false, msg: '' })
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (localStorage.getItem('cart') != undefined) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
        else {
            localStorage.setItem('cart', '[]')
            setCart([])
        }
    }, [])

    const del = (index) => {
        let tmp = cart
        tmp.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(tmp))
        setCart([...tmp])
        dispatch({ type: 'INC' })
    }

    const increase = (index) => {
        let tmp = cart
        if (tmp[index].product_quantity < 10) {
            tmp[index].product_quantity += 1
            localStorage.setItem('cart', JSON.stringify(cart))
            setCart([...tmp])
        }
    }

    const decrease = (index) => {
        let tmp = cart
        if (tmp[index].product_quantity >= 2) {
            tmp[index].product_quantity -= 1
            localStorage.setItem('cart', JSON.stringify(cart))
            setCart([...tmp])
        }
    }

    const proceedtobuy = () => {
        if (cart.length > 0 && sessionStorage.getItem('_token')) {
            navigate("/orderaddress", { state: { 'total': Math.ceil(cart.reduce((sum, ele) => (ele.product_quantity * ele.product_cost) + sum, 0) * 0.05) + cart.reduce((sum, ele) => (ele.product_quantity * ele.product_cost) + sum, 0), 'cart': cart, 'email': jwt_decode(sessionStorage.getItem('_token')).email } })
        }
        else {
            setAlert({ error: true, msg: 'Please Login First or Cart is Empty' })
        }
    }

    return (
        <div>
            <h5 className="d-flex w-100 justify-content-around">
                <span>Cart</span>
                <hr className='w-75' />
                <span>Delivery Address</span>
            </h5>
            <div className="d-flex justify-content-around">
                <div className="d-grid width-70 box-shadow p-3" style={{ borderRadius: '5px' }}>
                    <Row>
                        <Col sm={5} md={5} lg={5}><b>Product</b></Col>
                        <Col sm={2} md={2} lg={2}><b>Quantity</b></Col>
                        <Col sm={2} md={2} lg={2}><b>Price</b></Col>
                        <Col sm={2} md={2} lg={2}><b>Total</b></Col>
                        <Col sm={1} md={1} lg={1}></Col>
                    </Row>
                    <hr className='m-0' />
                    {cart && cart.map((ele, index) =>
                        <Row key={index}>
                            <Col sm={5} md={5} lg={5}>
                                <Row>
                                    <Col>
                                        <img src={`./product_images/${ele.product_image}`} loading="lazy" width="100%
                                " height="auto" className="m-1" alt='could not load images' /></Col>
                                    <Col>{ele.product_name}</Col>
                                </Row>
                            </Col>
                            <Col sm={2} md={2} lg={2}>
                                <HiMinusCircle className='icon-cart-red' onClick={() => decrease(index)} />
                                {ele.product_quantity}
                                <HiPlusCircle className='icon-cart-red' onClick={() => increase(index)} />
                            </Col>
                            <Col sm={2} md={2} lg={2}>
                                {ele.product_cost}
                            </Col>
                            <Col sm={2} md={2} lg={2}>{ele.product_quantity * ele.product_cost}</Col>
                            <Col sm={1} md={1} lg={1}><MdOutlineDelete className='icon-cart-red' onClick={() => del(index)} /></Col>
                        </Row>
                    )}
                    {cart && cart.length == 0 && <h5>No Items in Cart.</h5>}
                </div>
                <div className="p-3 box-shadow width-25" style={{ borderRadius: '10px', height: 'max-content' }}>
                    <h3>Review Order</h3>
                    <div className="d-flex justify-content-between">
                        <p className="m-0">Subtotal</p><p className="m-0">{cart.reduce((sum, ele) => (ele.product_quantity * ele.product_cost) + sum, 0)}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between ">
                        <p className="m-0">GST(5%)</p><p className="m-0">{Math.ceil(cart.reduce((sum, ele) => (ele.product_quantity * ele.product_cost) + sum, 0) * 0.05)}</p>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                        <p className="m-0">Order Total</p><p className="m-0">{Math.ceil(cart.reduce((sum, ele) => (ele.product_quantity * ele.product_cost) + sum, 0) * 0.05) + cart.reduce((sum, ele) => (ele.product_quantity * ele.product_cost) + sum, 0)}</p>
                    </div>
                    <Button variant="primary" className="w-100" onClick={() => proceedtobuy()}>Proceed to Buy</Button>
                    <Alert variant="danger" className="my-2" style={{ borderRadius: '10px' }} show={alert.error} onClose={() => setAlert({ ...alert, error: false })} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>{alert.msg}</p>
                    </Alert>
                </div>
            </div>
        </div >
    )
}
