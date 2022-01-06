import React from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import { Button } from 'react-bootstrap'

export default function Profile() {
    return (
        <div className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
            <h2>Profile</h2>
            <hr />
            <table >
                <tbody >
                    <tr>
                        <td>First Name</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Mobile Number</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <p><Button variant="light"><MdModeEditOutline style={{ fontSize: 'large', marginRight: '5px' }} />Edit</Button></p>
        </div >
    )
}
