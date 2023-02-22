import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import {  useToasts } from 'react-toast-notifications';

const AWS = (props) => {
  const [awscode, setAwscode] = useState("");
  const [parcelId, setparcelId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [parcelData, setParcelData] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const { id } = useParams();
  const [urlID, setUrlID] = useState(id);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("Insert AWB Code");
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { addToast } = useToasts();
  useEffect(() => {
    if (inputRef.current) {
      console.log("inputRef.current", inputRef.current);
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setIsRunning(true);
    runRefreshData();
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      setUrlID(id);
    }
  });

  const runRefreshData = async () => {
    await refreshData();
  };

  const refreshData = () => {
    //console.log("Refreshing Data");
    setParcelData([]);
    fetch(`http://localhost:3001/parcel/getParcel/${urlID}`)
      .then((response) => response.json())
      .then((data) => setParcelData(data))
      .catch((error) => console.error(error));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isRunning === false) {
      //console.log("Enter key pressed!");
      handleSubmit();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    console.log('Tracking No ' + parcelId);
    var flag = 0;
    //console.log("Printing List");
    for (var i = 0; i < parcelData.length; i++) {
      if (parcelData[i].parcelId === parcelId) {
        //console.log("Parcel Already Exists Bhai");
        flag = 1;
        break;
      }
    }

    if (parcelId === "") {
      flag = 2;
    }

    if (parcelId.length > 15) {
      flag = 3;
    }

    //console.log("Printing List done");

    if (flag === 0) {
      const current = new Date();

      const date = `${current.getDate()}.${
        current.getMonth() + 1
      }.${current.getFullYear()}`;
      var time;

      if (current.getHours() < 10) {
        if (current.getMinutes() < 10) {
          time = `0${current.getHours()}:0${current.getMinutes()}`;
        } else {
          time = `0${current.getHours()}:${current.getMinutes()}`;
        }
      } else {
        if (current.getMinutes() < 10) {
          time = `${current.getHours()}:0${current.getMinutes()}`;
        } else {
          time = `${current.getHours()}:${current.getMinutes()}`;
        }
      }
      const data = {
        parcelId: parcelId,
        Date: date,
        Time: time,
        Status: "Tracking",
        userId: urlID,
      };

      /// i will add this function
      try {
        const res = await axios.post("http://localhost:3001/parcel/add", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        //console.log(res.data.message);
        addToast(res.data.message, {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout : 3000,
        });
      
      } catch (err) {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
          addToast(message, {
            appearance: 'warning',
            autoDismiss: true,
            autoDismissTimeout : 3000,
          });
         
      }

      // fetch("http://localhost:3001/parcel/add", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((res) => {
      //     console.log("Parcel Added");
      //     console.log(res.message);
      //     toast.success(res.message);
      //     refreshData();
      //   })
      //   .catch((e) => {
      //     console.log("e", e);
      //   });
    } else if (flag === 1) {
      addToast(parcelId + " Duplicated", {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout : 3000,
      });
      
    } else if (flag === 2) {
      addToast("Please Enter a Valid Parcel ID", {
        appearance: 'error',
        autoDismiss: true,
      });
      // setError("Please Enter a Valid Parcel ID");
    } else if (flag === 3) {
      addToast("AWB Too Long", {
        appearance: 'info',
        autoDismiss: true,
      });
    }

    setText("Insert AWB Number");
    setInputValue("");
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setSuccess("");
      setError("");
    }, 1500);
  };

  const history = useHistory();

  const handleClick = () => {
    var id = urlID;
    history.push("/admin/index/" + id);
  };

  const handleCamera = () => {
    var id = urlID;
    history.push("/auth/camera/" + id);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setparcelId(event.target.value);
  };

  return (
    <>
      <Col lg="5" md="7" className="mx-auto">
        {/* <Card className="bg-secondary shadow border-0"> */}
        <Card
          className="bg-secondary shadow border-0"
          style={{
            maxWidth: "600px",
            marginTop: "120px",
            display: "flex",
            alignItems: "center",
            "@media (max-width: 500px)": {
              marginTop: "80px",
              height: "auto",
            },
          }}
        >
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder={text}
                    value={inputValue}
                    autoComplete="new-email"
                    onChange={handleInputChange}
                    required
                    innerRef={inputRef}
                  />
                  <Button onClick={handleCamera}>
                    <i className="fa fa-camera" />
                  </Button>
                </InputGroup>
              </FormGroup>
            </Form>
            <Row>
              <Col className="text-center" xs="12">
                <div>
                  {isVisible && error && (
                    <p style={{ color: "red" }}>{error}</p>
                  )}
                  {isVisible && success && (
                    <p style={{ color: "green" }}>{success}</p>
                  )}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="12">
            <a className="text-light" onClick={handleClick}>
              <small
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Back to Dashboard
              </small>
            </a>
          </Col>
        </Row>
        <Row></Row>
      </Col>
    </>
  );
};

export default AWS;
