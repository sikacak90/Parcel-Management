
import { useState, useEffect } from "react";
import Axios from 'axios';
// javascipt plugin for creating charts
import Chart from "chart.js";
import drop from "./examples/drop.css"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";

import {useParams, useHistory} from 'react-router-dom';

import Header from "components/Headers/Header.js";
import { Input,InputGroup } from "reactstrap";
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [parcelId,setparcelId] =useState("");
  const [status,setStatus] =useState("");
  const [date,setDate] =useState("");
  const [time,setTime] =useState("");
  const [dbId, setDbId] = useState("");
  const [unsortedData, setUnsortedData] = useState([]);
  const { id } = useParams();
  const [urlID, setUrlID] = useState(id);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    //console.log(urlID);
    fetch(`http://localhost:3001/parcel/getParcel/${urlID}`)
      .then(response => response.json())
      .then(data => {
        //console.log("DIS DA DATA: " + data);
        if(data !== undefined && data !== null){
          //console.log("I AM DA BAD DATA" + data);
          setUnsortedData(data);
        }
        else{
          setUnsortedData([]);
          //console.log("I AM DA DATA: " + unsortedData);
          }
        }
      )
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if(unsortedData !== undefined && unsortedData !== null){
      setData([...unsortedData].reverse());
    } 
  }, [unsortedData]);

  useEffect(() => {
    return () => {
      history.push(`/auth/InsertAWB/${urlID}`);
    };
  }, [history, urlID])

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
   
  const filteredData = data.filter(item =>
    item.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Time.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Status.toLowerCase().includes(searchQuery.toLowerCase())

  );
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const makeUpdate = (itemId) => {
    return (event) => {
      const current =new Date()

      setDate(`${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}`);

      if(current.getHours() < 10){
        if(current.getMinutes() < 10){
          setTime(`0${current.getHours()}:0${current.getMinutes()}`);
        }
        else{
          setTime(`0${current.getHours()}:${current.getMinutes()}`);
        }
      }
      else{
        if(current.getMinutes() < 10){
          setTime(`${current.getHours()}:0${current.getMinutes()}`);
        }
        else{
          setTime(`${current.getHours()}:${current.getMinutes()}`);
        }
      }
      console.log(itemId);
      fetch(`http://localhost:3001/parcel/updateAll/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({parcelId: parcelId, Date: date, Time: time}),
      })
        .then((response) => response.json())
        .then((data) => {console.log(data)})
        .catch((error) => console.error(error));

        window.location.reload();
    };
  }


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const handleStatus = (id) => (event) => {
    console.log(id);
    fetch(`http://localhost:3001/parcel/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Status: event.target.value}),
    })
      .then((response) => response.json())
      .then((data) => {console.log(data)})
      .catch((error) => console.error(error));

      window.location.reload();
  };
   
  const handletracking = (num) => {
    if (window.TrackButton) {
      window.TrackButton.track({
        tracking_no: num
      });
    }
  }
  useEffect(() => {
    // Wait for the TrackButton script to finish loading
    window.onload = () => {
      if (window.TrackButton) {
        console.log("TrackButton is loaded");
      }
    };
  }, []);
  
  return (
    <>
      <Header id={urlID}/>
      <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" value={searchQuery} onChange={e => {setSearchQuery(e.target.value)
                setCurrentPage(1);
                }} /> 
              </InputGroup>
      {/* Page content */}
      <Container className="mt--3" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-1">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Parcel Tracking</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Parcel ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(startIndex, endIndex).map((item, index) => (
    <tr key={item._id}>
      <th scope="row">
        <div className="media align-items-center">
          <div className="media-body">
            <span className="mb-0 text-sm">
            <a onClick={() => handletracking(item.parcelId)} style={{cursor:'pointer'}}>{item.parcelId}</a>
                           
                           <script src="//www.tracking.my/track-button.js"></script>
            </span>
          </div>
        </div>
      </th>
      <td>{item.Date}</td>
      <td>{item.Time}</td>
      <td>
                     
<div class="dropdown">
  <Button class="dropbtn"> &#8942;</Button>
  <div class="dropdown-content">
  <Button style={{width:'98%',borderRadius:'10px'}} onClick={() => {
   Axios
     .delete(`http://localhost:3001/parcel/del/${item._id}`)
     .then((response) => console.log(response.data))
     .catch((error) => console.log(error));
    window.location.reload();
 
}} >
Delete
</Button><br></br>
<Button key={index} style={{width:'98%',borderRadius:'10px'}} onClick={(index) =>{
  setparcelId(item.parcelId);
  setStatus(item.Status);
  setDate(item.Date);
  setTime(item.Time);
  setDbId(item._id);
  document.getElementById("floating-form").classList.remove("hidden");
  document.getElementById("floating-form").classList.add("show");
}}
>Edit</Button>
  </div>
</div>
                      </td>
                    </tr>
                  ))}
                  <div>
                    <Pagination aria-label="Page navigation example">
                      <PaginationItem disabled={currentPage <= 1}>
                        <PaginationLink previous onClick={() => handleClick(currentPage - 1)} />
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink>{currentPage}</PaginationLink>
                      </PaginationItem>
                      <PaginationItem disabled={currentPage >= totalPages}>
                        <PaginationLink next onClick={() => handleClick(currentPage + 1)} />
                      </PaginationItem>
                    </Pagination>
                  </div>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        <div id="floating-form" class="hidden">
      <Form>
      <Button>
        <i class="fas fa-times" onClick={() => {
          document.getElementById("floating-form").classList.remove("show");
          document.getElementById("floating-form").classList.add("hidden");
        }}></i>
      </Button>
      <InputGroup className="input-group-alternative mb-3">
        <Input
          placeholder={parcelId}
          type="text"
          onChange={(e) => setparcelId(e.target.value)}
        />
      </InputGroup>
      <Button
        color="primary"
        type="button"
        onClick={makeUpdate(dbId)}
        style={{width:'100%'}}
      >
        Update
      </Button>
    </Form>
      </div>
      </Container>
    </>
  );
};

export default Index;
