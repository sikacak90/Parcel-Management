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

  import { useHistory } from "react-router-dom";
  import {useState} from 'react';
  import axios from 'axios'

  const ForgotPassword = () => {


    const history = useHistory();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const reponse = await axios.post('https://api.akisyah.my/forgot-password/forgot-password', {email});
        setMessage(reponse.data.message);
      }
      catch(error){
        setMessage(error.response.data.message);
      };
    };

    const handleClick = () => {
        history.push('/auth/login')
    }

    return(
        <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
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
                    onChange = {(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
                  Send Password Reset Link
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
              <small>Back To Login</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ForgotPassword;