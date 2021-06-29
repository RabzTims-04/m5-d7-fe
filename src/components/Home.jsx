import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import './Home.css'
import { Link } from 'react-router-dom'

class Home extends Component {

    state={
        products:[]
    }

    componentDidMount =()=>{
        this.fetchProducts()
    }

    fetchProducts = async()=>{
        try {
            console.log(process.env.REACT_APP_BACKEND_URL);
            const url = process.env.REACT_APP_BACKEND_URL
            const response = await fetch(`https://amazon-products.herokuapp.com/products`)
            const data = await response.json()
            if(response.ok){
                this.setState({
                    products:data
                })
            }
            else{
                console.log('error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    }


    render() {

        return (

            <Container className="mt-5 pt-5">
                <Row>
                    {this.state.products && this.state.products.map(product => 
                    <Col xs={12} md={3} className="text-warning mt-1 text-center" key={product._id}>
                        <Card style={{ width: '18rem' }} className="text-center">
                            <Card.Img className="img-fluid card-img" variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <span>{product.price}</span>
                                    <p>{product.brand}</p>
                                </Card.Text>
                                <Link to={`/details/${product._id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>

                    </Col>
                    )}

                </Row>
                
            </Container>
        );
    }
}

export default Home;