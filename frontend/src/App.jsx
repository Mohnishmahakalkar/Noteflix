import "./css/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserPage } from "./components/UserPage";
import { LoginPage } from "./components/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/notesapp" element={<UserPage/>} />
          <Route path="/register" element={<RegistrationPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
