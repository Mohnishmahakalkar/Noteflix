import "./css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserPage } from "./components/UserPage";
import { LoginPage } from "./components/LoginPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/notesapp" element={<UserPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
