import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { MainScreen } from "../../components/MainScreen";
//import axios from "axios";
import { login } from "../../actions/userAction";
import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [error, seterror] = useState(false);
  // const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  //console.log(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   setloading(true);
    //   const { data } = await axios.post("/api/users/login", {
    //     email,
    //     password,
    //   });
    //   console.log(data);
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setloading(false);
    //   seterror(false);
    // } catch (err) {
    //   console.log("error", err);
    //   seterror(err.response.data.message);
    //   setloading(false);
    // }
    dispatch(login(email, password));
  };
  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
