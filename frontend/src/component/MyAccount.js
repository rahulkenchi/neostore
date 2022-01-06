import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'
import Order from './Order'
import Checkout from './Checkout'
import Profile from './Profile'
import AddNewAddress from './AddNewAddress'

export default function MyAccount() {
    const navigate = useNavigate()
    return (
        <div className="p-4">
            <h3>My Account</h3>
            <hr />
            <div className="myaccountmain">
                <div style={{ width: '25%' }}>
                    <div>
                        <img /><br /><p className='text-center'>Rahul</p>
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
    )
}

