import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Tabs, Tab, Form, Button, Row, Col, ListGroup } from 'react-bootstrap'

class Details extends Component {

  state={
    homePage:false,
    productDetails:{},
    reviews:[],
    deletedReview:'',
    postReview:{
      "rate":0,
      "comment":""
    },
    editReview:{
      'rate':0,
      'comment':''
    },
    editMode:''
  }

  componentDidMount = ()=>{
    this.fetchProduct()
    this.fetchReviews()
  }

  componentDidUpdate =(prevProps, prevState)=>{
    if((prevState.postReview.rate !== this.state.postReview.rate) || (prevState.postReview.comment !== this.state.postReview.comment)
    || (prevState.editReview.rate !== this.state.editReview.rate) || (prevState.editReview.comment !== this.state.editReview.comment) || (this.state.deletedReview && !this.state.reviews.includes(this.state.deletedReview._id))){
      this.setState({
        ...this.state,
        deletedReview:''
      })
      this.fetchReviews()
    }

    if(this.state.homePage){
      window.location.replace('http://localhost:3000')
    }

  }

  id = this.props.match.params.id
  url = `https://amazon-products.herokuapp.com/products/${this.id}`

  fetchProduct = async ()=>{   
    console.log(this.props.match.params.id);
    try {
      const productsUrl = `${this.url}`
      const response = await fetch(productsUrl)
      const data = await response.json()
      if(response.ok){
        this.setState({
          ...this.state,
          productDetails:data
        })
        console.log(this.state.productDetails);
      }
      else{
        console.log('error while fetching product details');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  deleteProduct = async (e) =>{
    try {
        const deleteProductUrl = `${this.url}`
        const response = await fetch(deleteProductUrl,{
          method:'DELETE'
        })
        if(response.ok){
          alert('product successfully deleted')
          this.setState({
            ...this.state,
            homePage:true
          })
        }
        else{
          console.log('product cannot be deleted');
        }
    } catch (error) {
        console.log(error);
    }
}

  fetchReviews = async () =>{
    try {
      const reviewsUrl = `${this.url}/reviews`
      const response = await fetch(reviewsUrl)
      const data = await response.json()
      if (response.ok) {
        this.setState({
          ...this.state,
          reviews:data.reverse()
        })
      } else {
        
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  reviewInputHandle =(e)=>{
    const id = e.target.id
    this.setState({
      ...this.state,
      postReview:{
        ...this.state.postReview,
        [id]: e.target.value
      }
    })
  }

  postReviews = async (e) =>{
    try {
      const postReviewUrl = `${this.url}/reviews`
      const response = await fetch(postReviewUrl,{
        method:'POST',
        body:JSON.stringify(this.state.postReview),
        headers:{
          'content-type':'application/json'
        }
      })
      if (response.ok) {
        alert('review posted')
        this.setState({
          ...this.state,
          postReview:{
            rate:"",
            comment:""
          }
        })
      } else {
        console.log("not able to post the review");
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  editReview = async (e) =>{
    const reviewId = e.currentTarget.id
    try {
      const editUrl = `${this.url}/reviews/${reviewId}`
      const response = await fetch(editUrl,{
        method:'PUT',
        body:JSON.stringify(this.state.editReview),
        headers:{
          'content-type': 'application/json'
        }
      })
      if (response.ok) {
        alert(`review edited successfully`)
        this.setState({
          ...this.state,
          editMode:'',
          editReview:{
            rate:'',
            comment:''
          }
        })
      } else {
        console.log('review cannot be edited');
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteReview = async (e) =>{
    const reviewId = e.currentTarget.id
    const deleteReviewUrl = `${this.url}/reviews/${reviewId}`
    try {
      const response = await fetch(deleteReviewUrl,{
        method:'DELETE'
      })
      const data = await response.json() 
      if (response.ok) {
        alert('review Deleted')
        this.setState({
          ...this.state,
          deletedReview:data
        })
      } else {
        console.log('review couldnot be deleted');
      }     
      
      
    } catch (error) {
      console.log(error);
    }
  }


    render() {
        return (
            <Container className="mt-5 pt-5">
                <Row className="mb-5 pb-5">
                    <Col xs={12} md={4}>
                        <img className="img-fluid details-img" src={this.state.productDetails.imageUrl} alt="product"/>
                    </Col>

                    <Col xs={12} md={8} className="mt-3 pl-5">
                         <ListGroup className="pl-5 ml-5" >
                            <ListGroup.Item style={{backgroundColor:'black'}}><span className="text-warning mr-3"> Name :</span> {this.state.productDetails.name} </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor:'black'}}><span className="text-warning mr-3"> Brand :</span> {this.state.productDetails.brand} </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor:'black'}}><span className="text-warning mr-3"> Price :</span> {this.state.productDetails.price} </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor:'black'}}><span className="text-warning mr-3"> Category :</span> {this.state.productDetails.category} </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor:'black'}}><span className="text-warning mr-3"> Description :</span> {this.state.productDetails.description} </ListGroup.Item>
                        </ListGroup>
                    </Col>                    
                </Row>

                <div className="d-flex justify-content-between mt-5 pt-5">
              <div>
                  <Link to={`/edit/${this.id}`}>
                    <Button
                      variant="secondary">
                        Edit Details
                      </Button>
                  </Link> 
              </div>
              <div>
                <Link>
                    <Button
                      onClick={(e)=>this.deleteProduct(e)} 
                      variant="danger">
                        Delete
                      </Button>
                  </Link>
                   
              </div>
            </div> 


          {/*POST reviews */}
          <div className="mt-5 pt-5">                                             
                        <div>
                            <Form.Group className="my-3">
                            <Form.Label>Reviews</Form.Label>
                            <Form.Control 
                            id="rate"
                            required
                            type="number"
                            max='5'
                            min='1'
                            value={this.state.postReview.rate}
                            onChange={(e)=> this.reviewInputHandle(e)}
                            size="lg" 
                            placeholder="Rate" />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control 
                            id="comment"
                            value={this.state.postReview.comment}
                            onChange={(e)=> this.reviewInputHandle(e)}
                            as="textarea"
                            placeholder="Comment" 
                            rows={3} />
                          </Form.Group>

                        </div>
                        <Button
                            onClick={(e)=> this.postReviews(e)} 
                            className="mt-4 mb-4" 
                            variant="primary">
                                Post Review
                        </Button>

                        <hr/>


            <h6>{this.state.reviews.length} {this.state.reviews.length === 1?'Comment':'Comments'}</h6>
            {this.state.reviews.length ? this.state.reviews.map(review => 
                <Card key={review._id} className="text-center justify-content-center">
                  {this.state.editMode === review._id 

                  ?<>
                  <Card.Header>
                        <div className="d-flex justify-content-between">
                                      <div>
                                          <Form.Group className="my-3">
                                            <Form.Label>Rate</Form.Label>
                                            <Form.Control 
                                            id="rate"
                                            type="number"
                                            max='5'
                                            min='1'
                                            required
                                            value={this.state.editReview.rate}
                                            onChange={(e)=> this.setState({
                                              ...this.state,
                                              editReview:{
                                                ...this.state.editReview,
                                                rate: e.target.value
                                              }
                                            })}
                                            size="lg" 
                                            placeholder="Author Name" />
                                          </Form.Group>
                                      </div>                                      
                                      <div>
                                        <svg onClick={(e)=>this.setState({
                                          ...this.state,
                                          editMode:''
                                        })} id={review._id} style={{color:'grey', height:'20px', width:'20px'}} fill="currentColor" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                      </div>
                                    </div>                                   
                                  </Card.Header>

                                  <Card.Body>
                                    <div className="d-flex flex-row justify-content-between">
                                      <div className="d-flex">
                                        <div className="pr-5">
                                          <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${review._id}`} alt="avatar"/>
                                        </div>
                                        <div>
                                            <Form.Group>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                            id="comment"
                                            value={this.state.editReview.comment}
                                            onChange={(e)=> this.setState({
                                              ...this.state,
                                              editReview:{
                                                ...this.state.editReview,
                                                comment:e.target.value
                                              }
                                            })}
                                            as="textarea"
                                            rows={3} />
                                          </Form.Group>
                                        </div>
                                      </div>
                                      <div className="">                                      
                                      <svg onClick={(e)=> this.editReview(e)} id={review._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                                          <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                        </svg> 
                                      </div>
                                    </div>                                
                                  </Card.Body> 

                  </>

                  :<>
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                                      <div>
                                        <h5>Rating: {review.rate === '1' ? "💔"  : review.rate === '2' ? "🧡🧡" : review.rate === '3'? "🧡🧡🧡" : review.rate === '4' ? "🧡🧡🧡🧡":"🧡🧡🧡🧡🧡" }</h5>
                                      </div>                                      
                                      <div>
                                        <svg onClick={(e)=>this.deleteReview(e)} id={review._id} style={{color:'red', height:'20px', width:'20px'}} fill="currentColor" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                      </div>
                                    </div>                                   
                                  </Card.Header>
                                  <Card.Body>
                                    <div className="d-flex flex-row justify-content-between">
                                      <div className="d-flex">
                                        <div className="pr-5">
                                          <img className="commentAvatar" src ={`https://i.pravatar.cc/150?u=${review._id}`} alt="avatar"/>
                                        </div>
                                        <div>
                                          <Card.Text>{review.comment}</Card.Text>
                                        </div>
                                      </div>
                                      <div className="">                                      
                                          <svg id={review._id} 
                                          onClick={(e)=> this.setState({
                                            ...this.state,
                                            editMode: e.currentTarget.id,
                                            editReview:{
                                              rate: review.rate,
                                              comment:review.comment
                                            }
                                          })}
                                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="20" height="20" focusable="false">
                                          <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                                          </svg> 
                                      </div>
                                    </div>                                
                                  </Card.Body> 
                                  </>
                                }
                             
              </Card>
              
              )
              :<p>Be first to review</p>}                  
                           
                </div>
            </Container>
        );
    }
}

export default Details