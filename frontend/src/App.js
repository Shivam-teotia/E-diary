import "./App.css";
import { Footer } from "./components/Footer.js/Footer";
import { Header } from "./components/Header/Header";
import { Landing } from "./pages/Landing/Landing";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/Registerpage/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyNotes } from "./pages/MyNotes/MyNotes";
import { CreateNote } from "./pages/createNote/CreateNote";
import { SingleNote } from "./pages/createNote/SingleNote";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/createnote" element={<CreateNote />} />
          <Route exact path="/notes/:id" element={<SingleNote />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
