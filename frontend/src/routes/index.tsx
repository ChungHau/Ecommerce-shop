import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />

      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default Router;
