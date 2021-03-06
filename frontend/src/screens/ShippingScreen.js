import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps';
import MetaComponent from '../components/Meta';

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }
    return (
        <Container>
        <MetaComponent title='Ecom - Shipping Address'/>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                <CheckOutSteps step1 />
                <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter address'
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter city'
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter postalCode'
                            value={postalCode} 
                            onChange={(e) => setPostalCode(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>country</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter country'
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)}>
                        </Form.Control>
                </Form.Group>

                <Button className='mt-3' type='submit' variant='primary'>Continue</Button>
            </Form>
                </Col>
            </Row>
        </Container>
           
    )
}

export default ShippingScreen
