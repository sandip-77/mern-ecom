import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, removeFromCart } from '../actions/cartActions'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import MetaComponent from '../components/Meta';
import { OREDER_CREATE_RESET } from '../constants/orderConstsants';

const CartScreen = ({match, location, history}) => {
    const productId = match.params.id


    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const { userInfo } = useSelector( state => state.userLogin)

    const cart = useSelector( state => state.cart)
    const { cartItems } = cart

    const validCartItems = cartItems.filter(i => i.customer_id === userInfo._id)

    console.log(validCartItems);

    useEffect(() => {
        if(productId){
            dispatch(addTocart(productId, qty))
        }
    },[dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
            dispatch(removeFromCart(id));
        }

    const checkoutHandler =() => {
        history.push('/login?redirect=shipping')
        dispatch({type:OREDER_CREATE_RESET})
    }

    return (
        <div>
        <MetaComponent title='Ecom Shopping Cart'/>
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {validCartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go Back</Link></Message>: (
                    <ListGroup variant='flash'>
                        {validCartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => {
                                                dispatch(addTocart(item.product, Number(e.target.value)))
                                            }} style={{cursor:'pointer'}}>{
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option value={x+1} key={x+1}> {x+1} </option>
                                                ))
                                                }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button typ='button' variant="light" onClick={() => {removeFromCartHandler(item.product)}}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({validCartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${validCartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={validCartItems.length===0} onClick={checkoutHandler} >Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </div>
    )
}

export default CartScreen
