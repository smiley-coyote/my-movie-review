import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Wrapper from "../../components/Wrapper"
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Sidebar from "../../components/Sidebar";
import Mainbody from "../../components/Mainbody";
import { Button, Modal } from 'react-bootstrap';

const CLOUDINARY_UPLOAD_PRESET = 'kmmnilon';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dmyiazu6p/image/upload';
let userRatings = [];

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
    let userImage = this.state.userimage;
  
    API.uploadImage({image: userImage})
    this.setState({show: false})
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
    userRatings = this.state.currentuser.ratings;
    for(let i = 0; i<userRatings.length; i++){
      let movieId = userRatings[i].imdbID;
      API.byId(movieId).then(res => {
        userRatings[i].poster = res.data.Poster
        
      })
    
      
    }
    this.setState({
      userratings: userRatings
    })
    
  }

  loadUser = () => {
    API.findUser(1).then(res => {
      this.setState({ currentuser: res.data})
      this.runUserRatings();
    })


    

  }

  componentDidMount() {
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
                    <div id={console.log(this.state.userratings)}>
                    <img src={res.poster} />
                    <p>Title: {res.title}</p>
                    <p>Rating: {res.rating}</p>
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
                  accept=".doc, .pdf, .docx, .jpg">
                  <div>Drop an image or click to select a file to upload.</div>
                </Dropzone>
              </div>

              <div>
                <div>
                  <Image cloudName="dmyiazu6p" publicId={this.state.userimage}>
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