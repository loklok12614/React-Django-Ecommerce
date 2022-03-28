import React from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector } from 'react-redux'


function Header() {

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    return (
        <header>
           <Navbar className='bg-primary navbar-dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>LokiTech</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">

                    <LinkContainer to="/cart">
                        <Nav.Link><i className='fas fa-shopping-cart'></i>Cart <Badge bg="success" pill>{cartItems.length}</Badge></Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/login">
                        <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
