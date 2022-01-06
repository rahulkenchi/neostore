import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdSave } from 'react-icons/md'
import { Form, FormControl, Button, Dropdown, DropdownButton, InputGroup, Alert } from 'react-bootstrap'
const Apitoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuc3Rjb2RlcnMxMjNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiTFJWbnF5aHhIUU5nWWdnRExEWGJ6NGoxNVVQSFhaaUFaLWlfb3o1amF1M0ZrQk5EelVFTlRXWXdha2ZRdUFCU3hBYyJ9LCJleHAiOjE2NDE1NTA0NjF9.cuHoxme3xNIFHfsb7UqJy8amNLnCsW5Hip_nWf1Kv0M'
export default function AddNewAddress() {
    const navigate = useNavigate()
    const [fields, setFields] = useState({ country: '', state: '', city: '', address: '', pincode: '' })
    const [errors, setErrors] = useState({ country: '', state: '', city: '', address: '', pincode: '' })
    const [displayfields, setDisplayfields] = useState({ country: [], state: [], city: [] })
    const [showAlert, setShowAlert] = useState(false)

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

    function handler(e) {
        setFields({ ...fields, [e.target.name]: e.target.value })
        if (e.target.name == "address") {
            if (e.target.value.length < 10) { setErrors({ ...errors, [e.target.name]: 'Address to short' }) }
            else { setErrors({ ...errors, [e.target.name]: '' }) }
        }
        if (e.target.name == "pincode") {
            if (e.target.value < 100000 || e.target.value > 999999) { setErrors({ ...errors, [e.target.name]: 'Pincode invalid' }) }
            else { setErrors({ ...errors, [e.target.name]: '' }) }
        }
    }

    const save = () => {
        let tmp = Object.keys(errors)
        let count = tmp.reduce((sum, ele) => sum + errors[ele].length, 0)
        if (count === 0) {
            let tmp2 = Object.keys(fields)
            let count2 = tmp2.reduce((sum, ele) => { if (fields[ele].length === 0) { return sum + 1 } return sum }, 0)
            if (count2 === 0) {
                //send data to backend
            }
            else {
                setShowAlert(true)
            }
        }
        else {
            setShowAlert(true)
        }
    }

    return (
        <div >
            <Alert variant="danger" onClose={() => setShowAlert(false)}
                show={showAlert}
                dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Some fields are empty not valid.</p>
            </Alert>
            <Form className='p-3' style={{ borderRadius: '10px', boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)` }}>
                <h2>Add new address</h2>
                <hr />
                <Form.Group className="mb-3">
                    <textarea className='w-100 p-2' name='address' onChange={handler}></textarea>
                    <p className="text-danger">{errors.address}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormControl type="number" name='pincode' onChange={handler} placeholder="Pincode" />
                    <p className="text-danger">{errors.pincode}</p>
                </Form.Group>
                <div className="d-flex justify-content-evenly">
                    <InputGroup>
                        <DropdownButton
                            variant="outline-secondary"
                            title={fields.country === '' ? "Country" : fields.country} >
                            {displayfields.country.map((ele) =>
                                <Dropdown.Item
                                    onClick={() => { setDisplayfields({ ...displayfields, state: [], city: [] }); setFields({ ...fields, country: ele.country_name }) }}>
                                    {ele.country_name}</Dropdown.Item>
                            )}
                        </DropdownButton>
                        <p className="text-danger">{errors.country}</p>
                    </InputGroup>
                    <InputGroup>
                        <DropdownButton variant="outline-secondary" title={fields.state === '' ? "State" : fields.state} >
                            {displayfields.state.map((ele) =>
                                <Dropdown.Item
                                    onClick={() => { setDisplayfields({ ...displayfields, city: [] }); setFields({ ...fields, state: ele.state_name }) }}>
                                    {ele.state_name}</Dropdown.Item>
                            )}
                        </DropdownButton>
                        <p className="text-danger">{errors.state}</p>
                    </InputGroup>
                    <InputGroup>
                        <DropdownButton variant="outline-secondary" title={fields.city === '' ? "City" : fields.city} >
                            {displayfields.city.map((ele) =>
                                <Dropdown.Item
                                    onClick={() => { setFields({ ...fields, city: ele.city_name }) }}>
                                    {ele.city_name}</Dropdown.Item>
                            )}
                        </DropdownButton>
                        <p className="text-danger">{errors.city}</p>
                    </InputGroup>
                </div>
                <hr />
                <p><Button onClick={() => save()} variant="light" ><MdSave style={{ fontSize: 'x-large' }} /> Save</Button> <Button variant="light" onClick={() => navigate("/myaccount/address")} style={{ fontWeight: 'bolder' }}>X Cancel</Button></p>
            </Form >
        </div >
    )
}
