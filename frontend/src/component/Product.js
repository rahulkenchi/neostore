import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import CreateStar from './CreateStar'
import { useNavigate, useLocation } from 'react-router-dom'
import { getproducts, getcategories, getcolors } from '../config/Myservice'
import { useDispatch } from 'react-redux'
import { AiFillStar, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { Button, Collapse, Card, Row, Col, Form } from 'react-bootstrap'

export default function Product() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [colors, setColors] = useState([])
    const [open, setOpen] = useState({
        categories: false,
        color: false
    })

    useEffect(() => {
        getproducts(location.search)
            .then(res => {
                if (res.data.err == 0) {
                    setProduct(res.data.data)
                    //console.log(res.data.data)
                }
            })
            .catch(err => console.log(err))
        getcategories()
            .then(res => {
                if (res.data.err == 0) {
                    setCategories(res.data.data);
                    // console.log(res.data.data)
                }
            })
            .catch(err => console.log(err))
        getcolors()
            .then(res => {
                if (res.data.err == 0) {
                    setColors(res.data.data);
                    // console.log(res.data.data)
                }
            })
            .catch(err => console.log(err))
    }, [])


    function Items({ currentItems }) {
        return (<>
            <Row className="g-3 paginationcss">
                {currentItems && currentItems.map((ele) =>
                    <Col key={ele._id} sm={6} md={4} lg={4} >
                        <Card className="h-100">
                            <Card.Img variant="top" height="200px" src={`./product_images/${ele.product_image}`}
                                onClick={() => navigate(`/productdetail?id=${ele._id}`)} />
                            <Card.Body>
                                <Card.Title style={{ color: 'blue' }}>{ele.product_name}</Card.Title>
                                <Card.Text>
                                    <p><b><i className="fa fa-inr"></i>{ele.product_cost}</b></p>
                                    <p className="text-center "><Button variant="danger"
                                        onClick={() => dispatch({ type: 'INC' })}
                                    >Add to Cart</Button></p>
                                    <p className="text-center"><CreateStar star={ele.product_rating} /></p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                }
            </Row>
        </>
        );
    }


    function PaginatedItems({ itemsPerPage }) {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(product.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(product.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % product.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }


    return (
        <div className="d-flex justify-content-around p-3 product">
            <hr />
            <div className='productdiv1'>
                <Form >
                    <ul className="p-0">
                        <li><Button variant="light" className="w-100 my-2" type="submit" >All Products</Button></li>
                        <li><Button variant="light" aria-controls="example-collapse-text" aria-expanded={open.categories} className="text-start w-100 my-2 overflow-hidden">
                            <p onClick={() => setOpen({ ...open, categories: !open.categories })} className='m-0'>Categories</p>
                            <Collapse in={open.categories}>
                                <ul style={{ paddingLeft: '10%' }}>
                                    {categories.map((ele) =>
                                        <li key={ele._id} className="overflow-hidden"> <Form.Check type="checkbox" name="category_id" label={ele.category_name} value={ele._id} /></li>
                                    )}
                                </ul>
                            </Collapse>
                        </Button>

                        </li>
                        <li><Button variant="light" aria-controls="example-collapse-text" aria-expanded={open.color} className="text-start w-100 my-2">
                            <p onClick={() => setOpen({ ...open, color: !open.color })} className='m-0'>Color</p>
                            <Collapse in={open.color}>
                                <ul style={{ paddingLeft: '10%' }}>
                                    {colors.map((ele) =>
                                        <li key={ele._id} className="overflow-hidden"> <Form.Check type="checkbox" name="color_id" label={ele.color_name} value={ele._id} /></li>
                                    )}
                                </ul>
                            </Collapse>
                        </Button>
                        </li>
                        <li><Button variant="warning" className="w-100 my-2" type="submit">Apply Filter</Button></li>
                    </ul>
                </Form>
            </div>
            <div className='productdiv2'>
                <h5 className='d-flex justify-content-end align-items-center'>
                    Sort By:
                    <Button variant="light" className="ms-2"><AiFillStar className='ms-1 me-1' /></Button>
                    <Button variant="light" className="ms-2">Price</Button>
                    <Button variant="light" className="ms-2"><AiOutlineArrowUp /></Button>
                    <Button variant="light" className="ms-2"><AiOutlineArrowDown /></Button>
                </h5>
                <Row>
                    <PaginatedItems itemsPerPage={6} />
                </Row>
            </div>
        </div >
    )
}
