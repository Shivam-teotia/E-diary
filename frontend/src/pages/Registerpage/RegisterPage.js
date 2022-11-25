import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Loading } from "../../components/Loading";
import { MainScreen } from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
export const RegisterPage = () => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [pic, setpic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setmessage] = useState(null);
  const [picMessage, setpicMessage] = useState(null);
  // const [error, seterror] = useState(false);
  // const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (!pics) {
      return setpicMessage("Please Select an Image");
    }
    setpicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notekeeper");
      data.append("cloud_name", "dqvaetyl1");
      fetch("https://api.cloudinary.com/v1_1/dqvaetyl1/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setpic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setpicMessage("Please Select an Image");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setmessage("Passwords Do not Match");
    }
    // else {
    //   setmessage(null);
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     };
    //     setloading(true);
    //     const { data } = await axios.post("/api/users", {
    //       name,
    //       pic,
    //       email,
    //       password,
    //     });
    //     setloading(false);
    //     seterror(false);
    //     setmessage(false);
    //     localStorage.setItem("userInfo", JSON.stringify(data));
    //   } catch (error) {
    //     seterror(error.response.data.message);
    //     setloading(false);
    //   }
    // }
    // console.log(email);
    else {
      dispatch(register(name, email, password, pic));
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}

        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>
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
              placeholder="Enter Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Already registered ? <Link to="/login">Login Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
