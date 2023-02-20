import React, { Component } from 'react'

import QrReader from 'react-qr-scanner'
import {
  
  Card,
  CardBody,
 
  Row,
  Col
} from "reactstrap";

class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: null,
      allParcel: [],
      setSuccess: "",
      setError: "",
      urlId: "",
    
      
    }

    this.handleScan = this.handleScan.bind(this)
  }

  buttonRef = React.createRef();

  handlekeyDown = (e) => {
    if(e.key === 'Enter'){
      window.location.reload();
    }

  }
     
  componentDidMount(){
    fetch("https://api.akisyah.my/parcel/getParcel")
    .then(response => response.json())
    .then(allParcel => this.setState({allParcel}))
    .catch(error => console.error(error));

    console.log(this.state.allParcel);

    this.timeoutId = setTimeout(() => {
      this.setState({ showMessage: false });
    }, 5000);

    if(this.props.match.params.id !== undefined){
      console.log("HERE IS THE ID: " + this.props.match.params.id);
      this.setState(
        {
        urlId: this.props.match.params.id
      })
    }

    document.addEventListener('keydown', this.handleKeyPress);
    return () => {
      document.removeEventListener('keydown', this.handleKeyPress);
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
 
  handleDashboard = () => {
   //const {history} =this.props;
  // history.push(`/auth/InsertAWB/${this.state.urlId}`)
    // window.location.replace = (`/auth/InsertAWB/${this.state.urlId}`);
    // const { urlId } = this.props.match.params;
    this.props.history.push(`/admin/index/${this.props.match.params.id}`);
  }

  handleData(data){
    console.log(data);
    if(data !== null){
      var flag = 0;

      this.state.allParcel.map((item) => {
        console.log(item.parcelId);
        if (item.parcelId === data.text) {
          flag = 1;
        }
      });


      if (flag === 0) {
        const current =new Date()
  
        const date = `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`;
        var time;
  
        if(current.getHours() < 10){
          if(current.getMinutes() < 10){
            time = `0${current.getHours()}:0${current.getMinutes()}`;
          }
          else{
            time = `0${current.getHours()}:${current.getMinutes()}`;
          }
        }
        else{
          if(current.getMinutes() < 10){
            time = `${current.getHours()}:0${current.getMinutes()}`;
          }
          else{
            time = `${current.getHours()}:${current.getMinutes()}`;
          }
        }
  
        const parceldata = {
          parcelId : data.text,
          Date : date,
          Time : time,
          Status : "Tracking",
          userId : this.state.urlId
        }
        fetch("https://api.akisyah.my/parcel/add",{
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify(parceldata)
        })
        .then((res) => console.log("Parcel Added")).catch(e => {
          console.log("e",e)
        });

        this.setState({
          setSuccess: "Parcel Added"
        })
      }
      else{
        this.setState({
          setError: "Parcel Already Exists"
        })
      }
    }
  }


  handleScan(data){
    console.log(data)
    this.handleData(data);
    this.setState({
      result: data
    })
  }
  handleError(err){
    console.error(err)
  }

  handleClick(){
    window.location.reload();
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      console.log("Enter Pressed");
      window.location.reload();
    }
  }

  render(){
    const previewStyle = {
      height: 1000,
      width: 640,
    }
    console.log(this.state.setError);
    console.log(this.state.setSuccess)

    return(
      <div>
        <Row>
        { !this.state.result && <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          /> }
        </Row>
        <Row>
          <Col>
            <Card className="bg-secondary shadow border-0">
              <CardBody  className="px-lg-9 py-lg-5" placeholder='hello'>
                <div className="text-center text-muted mb-4">
                  <p style={{fontSize:"40px",placeholder:"parcelId"}}>{this.state.result?.text}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              onClick={this.handleDashboard}
            >
              <small style={{fontSize:"20px",cursor:'pointer'}}>Back to Dashboard</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="/auth/camera"
              onKeyDown={this.handleKeyPress}
              onClick={this.handleClick}
            >
              <small style={{fontSize:"20px"}}>Press Enter to Scan Again</small>
            </a>
          </Col>
        </Row>
        <Row>
            <Col className = "text-center" xs="12">
              <div>
                {this.state.setError && <p style={{ color: 'red' ,fontSize:"30px" ,fontWeight:"20px"}}>{this.state.setError}</p>}
                {this.state.setSuccess && <p style={{ color: 'green',fontSize:"35px" ,fontWeight:"40px" }}>{this.state.setSuccess}</p>}
              </div>
            </Col>
        </Row>
      </div>
    )
  }
}
export default Test;