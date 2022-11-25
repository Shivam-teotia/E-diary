import React, { useEffect } from "react";
import { MainScreen } from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
// import { noteCreate } from "../../actions/notesAction";
export const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const noteCreate = useSelector((state) => state.noteCreate);
  // console.log(noteCreate);
  const { success: successCreate } = noteCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelelte,
  } = noteDelete;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ? ")) {
      dispatch(deleteNoteAction(id));
    }
  };
  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setdata(data);
  //   console.log(data);
  // };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(listNotes());
  }, [dispatch, successCreate, navigate, userInfo, successDelelte]);
  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 0 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes &&
        notes
          .reverse()

          .map((note) => {
            return (
              <Accordion key={note._id}>
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Toggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >
                        {note.title}
                      </Accordion.Toggle>
                    </span>
                    <div>
                      <Button href={`/notes/${note._id}`}>Edit</Button>
                      <Button
                        className="mx-2"
                        variant="danger"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <Badge variant="success">
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            );
          })}
    </MainScreen>
  );
};
