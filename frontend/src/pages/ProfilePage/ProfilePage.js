import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MainScreen } from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";
import { updateProfile } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
export const ProfilePage = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pic, setpic] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [picMessage, setpicMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setname(userInfo.name);
      setemail(userInfo.email);
      setpic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
    setpicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setpicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };
  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "centers",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt="none" className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
