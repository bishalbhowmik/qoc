/* eslint-disable react/react-in-jsx-scope */
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { router } from "./Routes/Route/Route";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

function App() {
  
  return (
    <Provider store={Store}>
      <div className="">
        <RouterProvider router={router} />
        <ToastContainer hideProgressBar position="top-center" autoClose={5000} />
      </div>
    </Provider>
  );
}

export default App;
