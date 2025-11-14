import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { userDataContext } from "../context/userContext";
import Header from "./header";  
function HomePage() {
  const { userData } = useContext(userDataContext);

  const products = [
    { id: 1, name: "Wireless Headphones", price: "₹2,499", image: "https://via.placeholder.com/200" },
    { id: 2, name: "Smart Watch", price: "₹3,999", image: "https://via.placeholder.com/200" },
    { id: 3, name: "Bluetooth Speaker", price: "₹1,799", image: "https://via.placeholder.com/200" },
    { id: 4, name: "Gaming Mouse", price: "₹999", image: "https://via.placeholder.com/200" },
  ];

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="p-5 mb-4 bg-light rounded-3 text-center">
          <h1 className="display-5 fw-bold">Welcome {userData ? userData.name : "Guest"}  </h1>
          <p className="fs-5 text-muted">
            {userData
              ? `We’re glad to have you back, ${userData.email}`
              : "Login to explore amazing products and exclusive deals!"}
          </p>
          <Button href="/shop" variant="primary" size="lg">
            Shop Now
          </Button>
        </div>

        <h3 className="mb-3">Featured Products</h3>
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body className="text-center">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted">{product.price}</Card.Text>
                  <Button variant="success">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <small>© {new Date().getFullYear()} MyEcomSite. All Rights Reserved.</small>
      </footer>
    </>
  );
}

export default HomePage;
