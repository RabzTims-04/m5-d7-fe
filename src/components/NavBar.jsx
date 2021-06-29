import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
                <Navbar collapseOnSelect className="fixed-top" expand="lg" style={{backgroundColor:'black', color:'grey'}}>
                    <Link to="/" className="text-muted navbar-brand">Amazon</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto text-muted">
                            <Link className="nav-link" style={{color:'orange'}} to="/">
                                Home
                            </Link>
                            <Link className="nav-link" style={{color:'orange'}}  to="/newProduct">
                                Add Product
                            </Link>
                            <Link className="nav-link" style={{color:'orange'}}  to="/">
                                Pricing
                            </Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-warning">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
        );
    }
}

export default withRouter(NavBar)