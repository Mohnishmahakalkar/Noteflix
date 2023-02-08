import "./css/index.css";
import { Routes, Route} from "react-router-dom";
import { UserPage } from "./components/Userpage/UserPage";
import { LoginPage } from "./components/Loginpage/LoginPage";
import { RegistrationPage } from "./components/Register page/RegistrationPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/notesapp" element={<UserPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
