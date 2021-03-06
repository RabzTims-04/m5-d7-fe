import React, { Component, createRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap'

class AddProduct extends Component {

    ref = createRef()

    state={
        postProduct:{
            "name": "",
            "description": "",
            "brand": "",
            "imageUrl": "http://avatar.com",
            "category": "",
            "price":0,
        }
    }

    postProduct = async (e)=>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('image', this.state.postProduct.image)
       try {
           const url = `${process.env.REACT_APP_BACKEND_URL}/products`
           const response = await fetch(url,{
               method:'POST',
               body:JSON.stringify({
                name:this.state.postProduct.name,
                description: this.state.postProduct.description,
                brand: this.state.postProduct.brand,
                imageUrl: this.state.postProduct.imageUrl,
                category:this.state.postProduct.category,
                price: this.state.postProduct.price
               }),
               headers:{
                   'content-type':'application/json'
               }
           })
           const data = await response.json()
           const productId = await data._id
           if(response.ok){
               if(this.state.postProduct.image){
                   try {
                       const postImg = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}/upload`,{
                           method:'POST',
                           body: formData
                       })
                       console.log(await postImg.json());
                       if(postImg.ok){
                           const imgData = await postImg.json()
                           console.log(imgData);
                       }
                       
                   } catch (error) {
                       console.log(error);
                   }
               }
               alert('details posted successfully')
               this.setState({
                postProduct:{
                    "name": "",
                    "description": "",
                    "brand": "",
                    "imageUrl": "http://avatar.com",
                    "category": "",
                    "price":""
                }
               })
               window.location.replace(`https://m5-d7-fe-git-main-rabztims-04.vercel.app`)
           }
       } catch (error) {
           console.log(error);
       } 
    }


    render() {

        return (
            /* POST product details */
            <Container className="mt-5">
                <Form onSubmit={(e)=> this.postProduct(e)}>
                    <Form.Group >
                        <Form.Label>Name of Product</Form.Label>
                        <Form.Control 
                        id="name"
                        type="text"
                        value={this.state.postProduct.name}
                        onChange={(e)=> this.setState({
                            postProduct:{
                                ...this.state.postProduct,
                                name:e.target.value
                            }
                        })} 
                        placeholder="Name" />
                    </Form.Group>

                    <label className="p-0 d-flex mb-2" for="image">                                     
                        <input 
                        onClick={(e)=> {e.stopPropagation()
                                return true}}  
                        hidden
                        type="file"
                        id="image"
                        ref={this.ref}
                        onChange={(e) => {this.setState({
                                    postProduct:{
                                    ...this.state.postProduct, 
                                    image: e.target.files[0]}
                                })
                                console.log(e.target.files[0])}}
                        />
                    </label> 
                    <Button
                        onClick={()=> this.ref.current.click()}
                        variant="secondary"
                        className=" mb-4"
                    >
                        Upload Image
                    </Button>   

                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        id="brand"
                         value={this.state.postProduct.brand}
                         onChange={(e)=> this.setState({
                            postProduct:{
                                ...this.state.postProduct,
                                brand:e.target.value
                            }
                        })}
                        type="text" 
                        placeholder="Brand" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                         id="price"
                         value={this.state.postProduct.price}
                        type="number" 
                        onChange={(e)=> this.setState({
                            postProduct:{
                                ...this.state.postProduct,
                                price:e.target.value
                            }
                        })}
                        placeholder="Price" />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                         id="category"
                         value={this.state.postProduct.category}
                         onChange={(e)=> this.setState({
                            postProduct:{
                                ...this.state.postProduct,
                                category:e.target.value
                            }
                        })} 
                        type="text" 
                        placeholder="Category" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        id="description"
                        value={this.state.postProduct.description} 
                        onChange={(e)=> this.setState({
                            postProduct:{
                                ...this.state.postProduct,
                                description:e.target.value
                            }
                        })}
                        placeholder="description"
                        as="textarea" 
                        rows={3} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>                
            </Container>
        );
    }
}

export default AddProduct;