import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import request from 'superagent';
// import Wrapper from "../../components/Wrapper"
import { Image, Transformation } from 'cloudinary-react';
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Sidebar from "../../components/Sidebar";
import Mainbody from "../../components/Mainbody";
import { Button, Modal } from 'react-bootstrap';
import "./Profile.css";
import { Link } from "react-router-dom";

const CLOUDINARY_UPLOAD_PRESET = 'kmmnilon';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dmyiazu6p/image/upload';
// let userRatings = [];

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentuser: {},
      topmovies: [],
      userratings: [],
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      userimage: "",
      modalDisplay: false,
      show: false
    };
  }


  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {

        let userImage = response.body.secure_url.split("/")[7];

        this.setState({
          userimage: userImage
        });
      }
    });
  }

  handleUpload = event => {
    event.preventDefault();
    const userImage = this.state.userimage;
    const id = this.props.auth.userId

    API.uploadImage({ image: userImage, id: id })
    this.setState({ show: false })
    this.loadUser();
  }

  handleClose = event => {
    event.preventDefault();
    this.setState({ show: false });
  }

  handleShow = event => {
    event.preventDefault();
    this.setState({ show: true })
  }

  runUserRatings = () => {
    let ratings = this.state.currentuser.ratings;
    ratings.sort(function compare(a, b) {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });
    this.setState({ userratings: ratings })

  }

  loadUser = () => {

    console.log(this.props.auth.userId)

    API.findUser(this.props.auth.userId).then(res => {
      this.setState({ currentuser: res.data })
      this.runUserRatings();
    })

    
 
    // API.findUser(id).then(res => {
    //   console.log(res.data);
    //   this.setState({ currentuser: res.data })
    //   this.runUserRatings();
    // })
  }

  

  componentDidMount () {
   this.loadUser();
   
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col size="md-3">
              <Sidebar title={"My Top Movies"}>
                {this.state.currentuser.topmovies !== undefined
                  ? <ol>
                    {this.state.currentuser.topmovies.map(res =>

                      <li key={res}>{res}</li>

                    )}

                  </ol>
                  : <p>Add top 5 movies</p>

                }
                <button>update</button>

              </Sidebar>
            </Col>

            <Col size="md-6">
              <Mainbody>
                {this.state.userratings !== []
                  ? <div>
                    {this.state.userratings.map(res =>
                      <div className="my-reviews" key={res.imdbID}>
                      <Link to={"/movie/?q=" + res.title.split(" ").join("+")}>
                        <img alt={res.title} src={res.poster} />
                        </Link>
                        <div className="reviews-title">
                        <h3>{res.title}</h3>
                        </div>
                        <div className="reviews-body">
                        <div className="border-box">
                        <p>My rating:</p>
                        {res.rating === 1
                          ? <p><span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span></p>
                          : res.rating === 2
                            ? <p><span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star"></span>
                              <span class="fa fa-star"></span></p>
                            : res.rating === 3
                              ? <p><span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span></p>
                              : res.rating === 4
                                ? <p>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                  <span class="fa fa-star checked"></span>
                                </p>
                                : <p>Rating Unavailable</p>
                        }
                        {res.review !== undefined
                        ?<p>{res.review}
                          <br />
                          -{this.state.currentuser.name}
                        </p>
                        :<p></p>
                        }
                      </div>
                      </div>
                  
                      </div>
                    )}
                  </div>
                  : <div>
                    <p>No Ratings Available</p>
                  </div>

                }
              </Mainbody>
            </Col>
            <Col size="md-3">
              <Sidebar title={"My Profile"}>
                <Image cloudName="dmyiazu6p" publicId={this.state.currentuser.image}>
                  <Transformation width="150" height="150" gravity="faces" crop="fill" />
                </Image>
                <button onClick={this.handleShow}>Update Picture</button>
              </Sidebar>
            </Col>
          </Row>
        </Container>
        <Modal show={this.state.show} onHide={this.handClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload New Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="FileUpload">
                <Dropzone
                  onDrop={this.onImageDrop.bind(this)}
                  multiple={false}
                  accept=".png, .jpg">
                  <div>Drop an image or click to select a file to upload.</div>
                </Dropzone>
              </div>

              <div>
                <div>
                  <Image cloudName="dmyiazu6p" publicId={this.state.currentuser.image}>
                    <Transformation width="150" height="150" gravity="faces" crop="fill" />
                  </Image>
                </div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                  <div>
                    <p>{this.state.uploadedFile.name}</p>
                  </div>}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleUpload}>Save Changes</Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>





      </div>
    )
  }
}

export default Profile;