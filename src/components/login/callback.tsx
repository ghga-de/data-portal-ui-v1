import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Spinner } from "react-bootstrap";
import authService from "../../services/auth";

/** Handle redirect after OIDC login */

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const handleError = () => {
      alert("Could not log in.");  // TODO: make nicer
      navigate(-1);
    };

    authService.callback().then((user) => {
      if (!user) {
        handleError();
      } else if (user.status) {
        navigate("/profile");
      } else {
        navigate("/register");
      }
    }).catch(error => {
      console.error(error);
      handleError();
    });
  }, [navigate]);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={1}><Spinner animation="border" role="status"></Spinner></Col>
        <Col><p>Logging in...</p></Col>
      </Row>
    </Container>);
};
  
export default Callback;
  