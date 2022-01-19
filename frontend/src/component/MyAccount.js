import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'
import jwt_decode from 'jwt-decode'

export default function MyAccount() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState({ error: false, msg: '' })
    const [data, setData] = useState()

    useEffect(() => {
        if (sessionStorage.getItem('_token') != undefined) {
            setData(jwt_decode(sessionStorage.getItem('_token')))
            // console.log(jwt_decode(sessionStorage.getItem('_token')))
        }
        else {
            setAlert({ error: true, msg: 'Please Login First' })
        }
    }, [])

    return (
        <div>
            <Alert variant="danger" show={alert.error} onClose={() => setAlert({ ...alert, error: false })} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{alert.msg}</p>
            </Alert>
            {data &&
                <div className="p-4">
                    <h3>My Account</h3>
                    <hr />
                    <div className="myaccountmain">
                        <div style={{ width: '25%' }}>
                            <div>
                                <p className='text-center'>
                                    {data.isSocialLogin ?
                                        <img src={data.profilePicURL} width="100px" style={{ borderRadius: '50%' }} />
                                        :
                                        <Avatar name={`${data.firstname} ${data.lastname}`} round />
                                    }
                                    <br />{data.firstname} {data.lastname}</p>
                            </div>
                            <div className="myaccountsidebar">
                                <button className='btn w-100' onClick={() => navigate("order")}><HiOutlineMenuAlt2 style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Order</button>
                                <button className='btn w-100' onClick={() => navigate("")}><MdAccountBox style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Profile</button>
                                <button className='btn w-100' onClick={() => navigate("address")}><MdLibraryBooks style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Address</button>
                                <button className='btn w-100' onClick={() => navigate("changepassword")}><BsArrowLeftRight style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Change Password</button>
                            </div>
                        </div>
                        <div style={{ width: '70%' }}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

