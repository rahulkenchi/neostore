import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdSave } from 'react-icons/md'
import { Form, FormControl, Button, Dropdown, DropdownButton } from 'react-bootstrap'
const Apitoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuc3Rjb2RlcnNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoialdzbzZTVlVuVlFZVmV1YXBxRnhyeXZIU2gyRDFHYXZSX0ROVG1oTnlXN0FOTlpXN05XZTRqRE5fZjY1aEJlTjBpcyJ9LCJleHAiOjE2NDE0NTYwMDF9.fU8wJUVP3ygF4D5ifq0p4w6vAmStmmRCatGLlhszhHI'
export default function AddNewAddress() {
    const [fields, setFields] = useState({ country: '', state: '', city: '' })
    const [displayfields, setDisplayfields] = useState({ country: [], state: [], city: [] })
    useEffect(() => {
        axios.get("https://www.universal-tutorial.com/api/countries/", { headers: { Authorization: Apitoken, Accept: 'application/json' } })
            .then(res => { setDisplayfields({ ...displayfields, country: res.data }); })
    }, [])

    useEffect(() => {
        axios.get(`https://www.universal-tutorial.com/api/states/${fields.country}`, { headers: { Authorization: Apitoken, Accept: 'application/json' } })
            .then(res => { setDisplayfields({ ...displayfields, state: res.data }); })
    }, [fields.country])

    useEffect(() => {
        axios.get(`https://www.universal-tutorial.com/api/cities/${fields.state}`, { headers: { Authorization: Apitoken, Accept: 'application/json' } })
            .then(res => { setDisplayfields({ ...displayfields, city: res.data }); })
    }, [fields.state])


    const save = () => {
        console.log(fields)
    }

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
                <div className="d-flex justify-content-evenly">
                    <DropdownButton variant="outline-secondary" title="Country" >
                        {displayfields.country.map((ele) =>
                            <Dropdown.Item
                                onClick={() => { setDisplayfields({ ...displayfields, state: [], city: [] }); setFields({ ...fields, country: ele.country_name }) }}>
                                {ele.country_name}</Dropdown.Item>
                        )}
                    </DropdownButton>
                    <DropdownButton variant="outline-secondary" title="State" >
                        {displayfields.state.map((ele) =>
                            <Dropdown.Item
                                onClick={() => { setDisplayfields({ ...displayfields, city: [] }); setFields({ ...fields, state: ele.state_name }) }}>
                                {ele.state_name}</Dropdown.Item>
                        )}
                    </DropdownButton>
                    <DropdownButton variant="outline-secondary" title="City" >
                        {displayfields.city.map((ele) =>
                            <Dropdown.Item
                                onClick={() => { setFields({ ...fields, city: ele.city_name }) }}>
                                {ele.city_name}</Dropdown.Item>
                        )}
                    </DropdownButton>
                </div>
                <hr />
                <p><Button onClick={() => save()} variant="light" ><MdSave style={{ fontSize: 'x-large' }} /> Save</Button> <Button variant="light" style={{ fontWeight: 'bolder' }}>X Cancel</Button></p>
            </Form >
        </div >
    )
}
