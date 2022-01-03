import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { Button, Collapse, Card, Row, Col, Pagination } from 'react-bootstrap'


export default function Product() {
    const [open, setOpen] = useState({
        categories: false,
        color: false
    })
    useEffect(() => {

    }, [])

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} >
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className="d-flex justify-content-around p-3">
            <hr />
            <div style={{ width: '20%' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Button variant="primary" className="w-100 my-2">All Products</Button></li>
                    <li><Button variant="primary" aria-controls="example-collapse-text" aria-expanded={open.categories} className="text-start w-100 my-2">
                        <p onClick={() => setOpen({ ...open, categories: !open.categories })} className='m-0 ps-2'>Categories</p>
                        <Collapse in={open.categories}>
                            <ul id="example-collapse-text" style={{ listStyle: 'none' }} >
                                <li>Table</li>
                                <li>Bed</li>
                                <li>Cupboard</li>
                                <li>Chairs</li>
                            </ul>
                        </Collapse>
                    </Button>

                    </li>
                    <li><Button variant="primary" aria-controls="example-collapse-text" aria-expanded={open.color} className="text-start w-100 my-2">
                        <p onClick={() => setOpen({ ...open, color: !open.color })} className='m-0 ps-2'>Color</p>
                        <Collapse in={open.color}>
                            <ul id="example-collapse-text" style={{ listStyle: 'none' }} >
                                <li>brown</li>
                                <li>blue</li>
                            </ul>
                        </Collapse>
                    </Button>

                    </li>
                </ul>
            </div>
            <div style={{ width: "75%" }}>
                <h5 className='text-end'>
                    Sort By: <AiFillStar className='ms-1 me-1' /> <Button variant="light"><AiOutlineArrowUp /></Button><Button variant="light"><AiOutlineArrowDown /></Button>
                </h5>
                <div style={{ display: 'grid', grid: '150px auto auto auto' }}>
                    {[0, 1, 2, 3, 5].map((ele) =>
                        <Card style={{ width: '30vw', height: '50vh' }}>
                            <Card.Img variant="top" height="100px" src="https://media.istockphoto.com/photos/old-wooden-chair-picture-id1288259097?b=1&k=20&m=1288259097&s=170667a&w=0&h=J6H9f5HTSNxxlf5ffiRpYZWQakQENYWXmUhg8XaBjBk=" />
                            <Card.Body>
                                <Card.Title style={{ color: 'blue' }}>Card Title</Card.Title>
                                <Card.Text>
                                    <p>50000</p>
                                    <p className="text-center"><Button variant="danger">Add to Cart</Button></p>
                                    <p></p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                    {/* <Row>
                        <Pagination className="justify-content-center mt-4">
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
                    </Row> */}
                </div>
            </div>
        </div >
    )
}
