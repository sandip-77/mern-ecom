import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {  Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch();


    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header className='head'>
            <Navbar bg="dark" variant='dark' collapseOnSelect expand="lg">
                <Container>
                    <LinkContainer to ='/'>
                        <Navbar.Brand href="/">Ecom</Navbar.Brand>
                    </LinkContainer>
                    <Route render={({history}) => <SearchBox history={history} />}/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse  id="basic-navbar-nav">
                        <Nav className="ms-auto">
                         <LinkContainer to ={userInfo ? '/cart' : '/login' }>
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to ='/login'>
                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                        </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderList'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                
                            </NavDropdown>
                        )}
                        
                        
                        </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
