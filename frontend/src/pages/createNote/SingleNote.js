import React, { useEffect, useState } from "react";
import { MainScreen } from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateNoteAction } from "../../actions/notesAction";
import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
export const SingleNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log(noteCreate);
  const { loading, error } = noteUpdate;
  //   console.log(note);

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/notes/${params.id}`, config);
      console.log(data);
      setTitle(data.title);
      setCategory(data.category);
      setContent(data.content);
      setDate(data.date);
    };
    fetching();
  }, [params.id, date]);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      return;
    }
    dispatch(updateNoteAction(params.id, title, content, category));
    resetHandler();
    navigate("/mynotes");
  };
  return (
    <MainScreen>
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}

            <Button type="submit" variant="primary">
              Update Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};
