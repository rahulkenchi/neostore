import React, { useEffect, useState } from 'react'
import CreateStar from './CreateStar'
import { getproducts, getcategories, getcolors } from '../config/Myservice'
import { useDispatch } from 'react-redux'
import { AiFillStar, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { Button, Collapse, Card, Row, Col, Pagination, Form } from 'react-bootstrap'

export default function Product() {
    const dispatch = useDispatch()
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [colors, setColors] = useState([])
    const [open, setOpen] = useState({
        categories: false,
        color: false
    })
    useEffect(() => {
        getproducts()
            .then(res => { setProduct(res.data); console.log(res.data) })
            .catch(err => console.log(err))
        getcategories()
            .then(res => { setCategories(res.data); console.log(res.data) })
            .catch(err => console.log(err))
        getcolors()
            .then(res => { setColors(res.data); console.log(res.data) })
            .catch(err => console.log(err))
    }, [])

    // let active = 2;
    // let items = [];
    // for (let number = 1; number <= 5; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active} >
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }

    return (
        <div className="d-flex justify-content-around p-3 product">
            <hr />
            <div className='productdiv1'>
                <ul className="p-0">
                    <li><Button variant="light" className="w-100 my-2">All Products</Button></li>
                    <li><Button variant="light" aria-controls="example-collapse-text" aria-expanded={open.categories} className="text-start w-100 my-2 overflow-hidden">
                        <p onClick={() => setOpen({ ...open, categories: !open.categories })} className='m-0'>Categories</p>
                        <Collapse in={open.categories}>
                            <ul>
                                {categories.map((ele) =>
                                    <li> <Form.Check type="checkbox" name="categories" label={ele.category_name} value={ele.category_name} /></li>
                                )}
                            </ul>
                        </Collapse>
                    </Button>

                    </li>
                    <li><Button variant="light" aria-controls="example-collapse-text" aria-expanded={open.color} className="text-start w-100 my-2">
                        <p onClick={() => setOpen({ ...open, color: !open.color })} className='m-0'>Color</p>
                        <Collapse in={open.color}>
                            <ul >
                                {colors.map((ele) =>
                                    <li> <Form.Check type="checkbox" name="colors" label={ele.color_name} value={ele.color_name} /></li>
                                )}
                            </ul>
                        </Collapse>
                    </Button>
                    </li>
                    <li><Button variant="warning" className="w-100 my-2">Apply Filter</Button></li>
                </ul>
            </div>
            <div className='productdiv2'>
                <h5 className='text-end'>
                    Sort By: <AiFillStar className='ms-1 me-1' /> <Button variant="light"><AiOutlineArrowUp /></Button><Button variant="light"><AiOutlineArrowDown /></Button>
                </h5>
                <Row className="g-3">
                    {product.map((ele) =>
                        <Col sm={6} md={4} lg={4} >
                            <Card style={{ maxWidth: '250px', margin: '10px auto', height: '400px', position: 'relative' }}>
                                <Card.Img variant="top" height="200px" src={`./product_images/${ele.product_image}`} />
                                <Card.Body>
                                    <Card.Title style={{ color: 'blue' }}>{ele.product_name}</Card.Title>
                                    <Card.Text>
                                        <p>{ele.product_cost}</p>
                                        <Button variant="danger"
                                            onMouseOver={() => dispatch({ type: 'INC' })}
                                            style={{ position: 'absolute', bottom: '15px', left: '30%' }}>Add to Cart</Button>
                                        <p><CreateStar star={ele.product_rating} /></p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
                {/* <div className="d-flex justify-content-flex">
                    <Pagination>    
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div> */}
            </div>
        </div >
    )
}
