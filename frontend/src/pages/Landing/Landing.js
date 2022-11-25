import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Landing.css";
//import { useNavigate } from "react-router-dom";
export const Landing = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/mynotes");
  //   }
  // }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to NoteKeeper</h1>
              <p className="subtitle">Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};
