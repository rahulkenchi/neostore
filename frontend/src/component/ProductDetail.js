import React, { useEffect, useState } from 'react'
import CreateStar from './CreateStar'
import { getproductdetail } from '../config/Myservice'
import { useLocation } from 'react-router-dom'
import { BsFillShareFill } from 'react-icons/bs'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, WhatsappIcon, TwitterIcon, EmailIcon } from 'react-share'
import Magnifier from 'react-magnifier'
import { Container, Tabs, Tab, Button } from 'react-bootstrap'

export default function ProductDetail() {
    const location = useLocation()
    const [productDetail, setProductDetail] = useState(null)
    const [currentImage, setCurrentImage] = useState('')
    const [key, setKey] = useState('Description');

    useEffect(() => {
        console.log(location.search)
        getproductdetail(location.search)
            .then(res => {
                setProductDetail(res.data)
                setCurrentImage(res.data.product_image)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container className="my-2">
            <div className='productdetaildiv1'>
                <div className="p-2">
                    <p>
                        <Magnifier src={`./product_images/${currentImage}`} width="100%"
                            zoomFactor={2} mgWidth={90} mgHeight={90}
                        />
                    </p>
                    <p className="d-flex overflow-auto pb-3">
                        {productDetail && productDetail.product_subimages.map(ele =>
                            <img height="60px" alt="no image" src={`./product_images/${ele}`} onClick={() => setCurrentImage(ele)} className="m-1" />
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
                        <Button variant="info">Add to Cart</Button>
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
                        <p>dsa</p>
                    </Tab>
                    <Tab eventKey="Features" title="Features">
                        <p>dsa</p>
                    </Tab>
                </Tabs>
            </div>
        </Container>
    )
}
