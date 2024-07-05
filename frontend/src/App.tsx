import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server";

const queryClient = new QueryClient();

const App = () => {
  // useEffect(() => {
  //   console.log("useEffect");

  //   axios
  //     .get(`${server}/user/get-user`, { withCredentials: true })
  //     .then((res) => toast.success(res.data.message))
  //     .catch((err) => toast.error(err.response.data.message));
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
