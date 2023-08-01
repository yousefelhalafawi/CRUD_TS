import React from "react";
import { Container } from "react-bootstrap";

const ErrorMe = () => {
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-4">PAGE NOT FOUND</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <img
        src="https://blog.thomasnet.com/hubfs/shutterstock_774749455.jpg" 
        alt="Page Not Found"
        className="img-fluid w-50"
      />
    </Container>
  );
};

export default ErrorMe;
