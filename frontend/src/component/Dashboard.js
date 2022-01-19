import React, { useEffect, useState, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { getcarouselimages, getpopularproducts, addtocart } from '../config/Myservice'
import { useNavigate } from 'react-router-dom'
import { Carousel, Container, Button, Row, Col, Card } from 'react-bootstrap'
const CreateStar = lazy(() => import('./CreateStar'))


export default function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [carouselImages, setCarouselImages] = useState([])
    const [popularproducts, setPopularProducts] = useState([])
    useEffect(() => {
        getcarouselimages()
            .then(res => setCarouselImages(res.data))
        getpopularproducts()
            .then(res => setPopularProducts(res.data))
    }, [])

    return (
        <div>
            <Carousel className="mb-4">
                {carouselImages.map((ele) =>
                    <Carousel.Item key={ele._id}>
                        <img
                            className="d-block w-50 mx-auto"
                            src={`./product_images/${ele.product_image}`}
                            alt="First slide"
                            height="400px"
                            width='auto'
                        />
                    </Carousel.Item>
                )}
            </Carousel>
            <Container className="px-5">
                <h2 className="text-center">Popular Products</h2>
                <h4 className="text-center"><Button variant="light" onClick={() => navigate("/product")}>View ALL</Button></h4>
                <Row>
                    {popularproducts.map((ele) =>
                        <Col key={ele._id} sm={6} md={4} lg={4} className="d-flex justify-content-center g-3">
                            <Card style={{ width: "200px" }}>
                                <Card.Img variant="top" height="150px" src={`./product_images/${ele.product_image}`}
                                    loading="lazy" alt='could not load images' onClick={() => navigate(`/productdetail?id=${ele._id}`)} />
                                <Card.Body>
                                    <Card.Title style={{ color: 'blue' }}>{ele.product_name}</Card.Title>
                                    <Card.Text>
                                        <p className="text-center">{ele.product_cost}</p>
                                        <p className="text-center" ><Button variant="danger"
                                            onClick={() => { dispatch({ type: 'INC' }); addtocart(ele) }}
                                        >Add to Cart</Button> </p>
                                        <p className="text-center"><CreateStar star={ele.product_rating} /></p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    )
}
