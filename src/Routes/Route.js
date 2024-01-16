import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main/Main";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Lesson from "../Pages/Lesson/Lesson";
import Logout from "../Pages/Logout/Logout";
import TeacherPrivateRouter from "./Private/TeacherPrivateRouter";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";
import TeacherDashboard from "../Pages/Teacher/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "../Pages/Student/StudentDashboard/StudentDashboard";
import AdminPrivateRouter from "./Private/AdminPrivateRouter";
import StudentPrivateRouter from "./Private/StudentPrivateRouter";
import TuitionAdmin from "../Pages/Admin/Tuition/TuitionAdmin";
import Exam from "../Pages/Admin/Exam/Exam";
import Teacher from "../Pages/Admin/Teacher/Teacher";
import Student from "../Pages/Admin/Student/Student";
import Batch from '../Pages/Student/Batch/Batch'
import Tutor from '../Pages/Student/Tutor/Tutor'
import CreateTuition from '../Pages/Student/Tuition/CreateTuition'
import TuitionTeacher from "../Pages/Teacher/Tuition/TuitionTeacher";
import FindTuition from "../Pages/FindTuition/FindTuition";
import Course from "../Pages/Admin/Course/Course";
import Curriculum from "../Pages/Admin/Course/Curriculum";
import Subject from "../Pages/Admin/Course/Subject";
import Chapter from "../Pages/Admin/Course/Chapter";
import Module from "../Pages/Admin/Course/Module";
import StudentCourse from "../Pages/Student/StudentCourse/StudentCourse";
import StudentCurriculum from "../Pages/Student/StudentCourse/StudentCurriculum";
import StudentSubject from "../Pages/Student/StudentCourse/StudentSubject";
import StudentModule from "../Pages/Student/StudentCourse/StudentModule";
import StudentChapter from "../Pages/Student/StudentCourse/StudentChapter";
import TeacherCourse from "../Pages/Teacher/TeacherCourse/TeacherCourse";
import TeacherCurriculum from "../Pages/Teacher/TeacherCourse/TeacherCurriculum";
import TeacherSubject from "../Pages/Teacher/TeacherCourse/TeacherSubject";
import TeacherChapter from "../Pages/Teacher/TeacherCourse/TeacherChapter";
import TeacherModule from "../Pages/Teacher/TeacherCourse/TeacherModule";
import Mcq from "../Pages/Admin/Mcq/Mcq";
import BroadQuestion from "../Pages/Admin/BroadQuestion/BroadQuestion";
import StudentAllExam from "../Pages/Student/StudentExam/StudentAllExam";
import StudentExam from "../Pages/Student/StudentExam/StudentExam";
import ExamDetails from "../Pages/Admin/Exam/ExamDetails";
import AssignmentStudent from "../Pages/Student/Assignment/Assignment";
import Success from "../Pages/Payment/Success";
import Cancel from "../Pages/Payment/Cancel";
import Fail from "../Pages/Payment/Fail";
import Assignment from "../Pages/Admin/Assignment/Assignment";
import TeacherBatch from "../Pages/Teacher/TeacherBatch/TeacherBatch";
import MyBatch from "../Pages/Student/Batch/MyBatch";
import BatchDashboard from "../Pages/Student/Batch/BatchDashboard";
import TeacherBatchDashboard from "../Pages/Teacher/TeacherBatch/TeacherBatchDashboard";
import AdminBatch from "../Pages/Admin/Batch/AdminBatch";
import AdminBatchDashboard from "../Pages/Admin/Batch/AdminBatchDashboard";



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
        path: "/logout",
        element: <Logout></Logout>
      },

      {
        path: "/find-tuition",
        element: <FindTuition />,
      },

      {
        path: "/success",
        element: <Success />,
      },

      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "/fail",
        element: <Fail />,
      },


      {
        path: "/admin-dashboard",
        element: <AdminPrivateRouter>  </AdminPrivateRouter>,
        children: [{

          path: "",
          element: <AdminDashboard />,
        },
        {

          path: "exam",
          element: <Exam />,
        },

        {
          path: "teacher",
          element: <Teacher />,
        },
        {
          path: "student",
          element: <Student />,
        },
        {
          path: "course",
          element: <Course />,
        },
        {
          path: "tuition",
          element: <TuitionAdmin />,
        },

        {
          path: "curriculum",
          element: <Curriculum />,
        },
        {
          path: "subject",
          element: <Subject />,
        },
        {
          path: "chapter",
          element: <Chapter />,
        },
        {
          path: "module",
          element: <Module />,
        },

        {
          path: "mcq",
          element: <Mcq />,
        },
        {
          path: "broad-question",
          element: <BroadQuestion />,
        },
        {
          path: "exam-details/:examId",
          element: <ExamDetails />,
        },
        {
          path: "assignment",
          element: <Assignment />,
        },
        {
          path: "batch",
          element: <AdminBatch />,
        },
        {
          path: "batch/dashboard/:batchId",
          element: <AdminBatchDashboard />,
        },

        ]
      },


      {
        path: "/teacher-dashboard",
        element: <TeacherPrivateRouter> </TeacherPrivateRouter>,
        children: [
          {
            path: "",
            element: <TeacherDashboard />,
          },
          {
            path: "student",
            element: '<Student />',
          },
          {
            path: "tuition",
            element: <TuitionTeacher />,
          },
          {
            path: "course",
            element: <TeacherCourse />,
          },

          {
            path: "curriculum",
            element: <TeacherCurriculum />,
          },
          {
            path: "subject",
            element: <TeacherSubject />,
          },
          {
            path: "chapter",
            element: <TeacherChapter />,
          },
          {
            path: "module",
            element: <TeacherModule />,
          },
          {
            path: "batch",
            element: <TeacherBatch />,
          },
          {
            path: "batch/dashboard/:batchId",
            element: <TeacherBatchDashboard />,
          },


        ]
      },
      {
        path: "/student-dashboard",
        element: <StudentPrivateRouter>  </StudentPrivateRouter>,
        children: [
          {
            path: "",
            element: <StudentDashboard />,
          },
          {
            path: "tutor",
            element: <Tutor />,
          },
          {
            path: "batch",
            element: <Batch />,
          },
          {
            path: "create-tuition",
            element: <CreateTuition />,
          },

          {
            path: "course",
            element: <StudentCourse />,
          },

          {
            path: "curriculum",
            element: <StudentCurriculum />,
          },
          {
            path: "subject",
            element: <StudentSubject />,
          },
          {
            path: "chapter",
            element: <StudentChapter />,
          },
          {
            path: "module",
            element: <StudentModule />,
          },
          {
            path: "all-exam",
            element: <StudentAllExam />,
          },
          {
            path: "exam",
            element: <StudentExam />,
          },
          {
            path: "assignment",
            element: <AssignmentStudent />,
          },

          {
            path: "my-batch",
            element: <MyBatch />,
          },
          {
            path: "my-batch/dashboard/:batchId",
            element: <BatchDashboard />,
          },

        ]
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
