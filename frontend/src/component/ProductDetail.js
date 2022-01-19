import React, { useEffect, useState, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { getproductdetail, addrating, addtocart } from '../config/Myservice'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsFillShareFill } from 'react-icons/bs'
import { Rating } from 'react-simple-star-rating'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, WhatsappIcon, TwitterIcon, EmailIcon } from 'react-share'
import Magnifier from 'react-magnifier'
import { Container, Tabs, Tab, Button } from 'react-bootstrap'
const CreateStar = lazy(() => import('./CreateStar'))

export default function ProductDetail() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [rating, setRating] = useState(0)
    const [showrating, setShowRating] = useState(false)
    const [productDetail, setProductDetail] = useState(null)
    const [currentImage, setCurrentImage] = useState('')
    const [key, setKey] = useState('Description');

    useEffect(() => {
        if (location.search.length < 1) { alert('no product selected. redirect to products'); navigate("/product") }
        getproductdetail(location.search)
            .then(res => {
                setProductDetail(res.data)
                setCurrentImage(res.data.product_image)
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [location.search])

    const handleRating = (rate) => {
        setRating(rate)
        setShowRating(false)
        console.log(rate / 20)
        let tmp = { '_id': productDetail._id, 'rating': Math.ceil(rate / 20) }
        addrating(tmp)
            .then(res => {
                if (res.data.err === 0) {
                    console.log(res.data.msg)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="my-2">
            <div className='productdetaildiv1'>
                <div className="p-2">
                    <p>
                        <Magnifier src={`./product_images/${currentImage}`} width="100%" />
                    </p>
                    <p className="d-flex overflow-auto pb-3">
                        {productDetail && productDetail.product_subimages.map((ele, index) =>
                            <img key={index} loading="lazy" height="60px" alt='could not load images' src={`./product_images/${ele}`} onClick={() => setCurrentImage(ele)} className="m-1" />
                        )}
                    </p>
                </div>
                <div className="p-2">
                    <h3>{productDetail && productDetail.product_name}</h3>
                    <p ><CreateStar star={productDetail && productDetail.product_rating} /></p>
                    <hr />
                    <p>Price : <i className="fa fa-inr"></i> {productDetail && productDetail.product_cost}</p>
                    <p className="d-flex">Color :&nbsp;<input type="color" value={productDetail && productDetail.color_id ? productDetail.color_id.color_code : '#ffffff'} /></p>
                    <p>Share <BsFillShareFill /></p>
                    <p>
                        <FacebookShareButton url={window.location} className="me-2">
                            <FacebookIcon className="rounded-circle" size="40px"  ></FacebookIcon>
                        </FacebookShareButton>
                        <TwitterShareButton url={window.location} className="me-2">
                            <TwitterIcon className="rounded-circle" size="40px" ></TwitterIcon>
                        </TwitterShareButton>
                        <WhatsappShareButton url={window.location} className="me-2">
                            <WhatsappIcon className="rounded-circle" size="40px"></WhatsappIcon>
                        </WhatsappShareButton>
                        <EmailShareButton url={window.location} className="me-2">
                            <EmailIcon className="rounded-circle" size="40px" ></EmailIcon>
                        </EmailShareButton>
                    </p>
                    <p>
                        <Button variant="info" onClick={() => { dispatch({ type: 'INC' }); addtocart(productDetail) }}>Add to Cart</Button>
                        <Button varinat="light" className="ms-2" onClick={() => setShowRating(!showrating)}>Add Rating</Button><br /><br />
                        {showrating &&
                            <Rating onClick={handleRating} ratingValue={rating} />}
                    </p>
                </div>
            </div>
            <div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="Description" title="Description">
                        {productDetail && <p>{productDetail.product_desc}</p>}
                    </Tab>
                    <Tab eventKey="Features" title="Features">
                        {productDetail && <p>{productDetail.product_features}</p>}
                    </Tab>
                </Tabs>
            </div>
        </Container >
    )
}
