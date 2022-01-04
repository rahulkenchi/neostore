import React from 'react'
import { MdSave } from 'react-icons/md'
import { Form, FormControl, Button } from 'react-bootstrap'

export default function AddNewAddress() {
    return (
        <div >
            <Form className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                <h2>Add new address</h2>
                <hr />
                <Form.Group className="mb-3">
                    <textarea></textarea>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormControl type="number" placeholder="Pincode" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormControl type="text" placeholder="City" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormControl type="text" placeholder="State" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormControl type="text" placeholder="Country" />
                </Form.Group>
                <hr />
                <p><Button variant="light" disabled><MdSave style={{ fontSize: 'x-large' }} /> Save</Button> <Button variant="light" style={{ fontWeight: 'bolder' }}>X Cancel</Button></p>
            </Form>
        </div>
    )
}
