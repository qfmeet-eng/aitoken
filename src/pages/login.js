import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from "axios";
import { authDataContext } from "../context/authcontext";
import { userDataContext } from "../context/userContext";
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post(`${serverUrl}/user/login`, { email, password });
      localStorage.setItem("token", result.data.data.token);
      localStorage.setItem("userData", JSON.stringify(result.data.data));
      getCurrentUserData();
      navigate("/");    
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f4fdf7" }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 style={{ color: "#2e7d32", fontWeight: 700 }}>BuyCart</h2>
                <p className="text-muted">Sign in to continue</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ borderRadius: "0.5rem" }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={show ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ borderRadius: "0.5rem" }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShow((prev) => !prev)}
                      style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
                    >
                      {show ? <IoEyeOutline /> : <IoEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  style={{
                    backgroundColor: "#2e7d32",
                    borderColor: "#2e7d32",
                    fontWeight: 600,
                    padding: "0.6rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  Login
                </Button>

                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <span
                    className="text-success fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/signup")}
                  >
                    Register
                  </span>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
