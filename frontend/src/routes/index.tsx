import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ActivationPage from "../pages/ActivationPage";
const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />

      <Route path="/activation/:activation_token/" element={<ActivationPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default Router;
