import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Main from "../../Layout/Main/Main";
import SignUp from "../../Pages/Home/SignUp/SignUp";
import Login from "../../Pages/Login/Login";
import Lesson from "../../Pages/Lesson/Lesson";
import FindTutors from "../../Pages/FindTutors/FindTutors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/lesson",
        element: <Lesson></Lesson>,
      },
      {
        path: "/findtutors",
        element: <FindTutors></FindTutors>,
      },
      {
        path: "*",
        element: (
          <div className="text-3xl flex items-center justify-center h-[50vh]">
            Page Not found
          </div>
        ),
      },
    ],
  },
]);
