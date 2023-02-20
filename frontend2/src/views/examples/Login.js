
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

const Login = () => {

  const history = useHistory();
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      console.log('inputRef.current', inputRef.current);
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/user/getUser")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && buttonRef.current) {
      console.log('Enter key pressed!');
      buttonRef.current.click();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/auth/forgot-password");
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    history.push("/auth/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var flag = 0;
    data.map((item) => {
      if (item.email === email && item.password === password) {
        var id = item._id;
        history.push("/admin/index/" + id)
        flag = 1;
      }
    });

    if (flag === 0) {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Login To Your Account</h2>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">  
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange= {(e) => setEmail(e.target.value)}
                    innerRef={inputRef}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange = {(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={handleSubmit} innerRef={buttonRef} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={handleClick}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="/auth/register"
              onClick={handleClick2}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
