import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";
import axios from "axios";
import { signupApi } from "../../Api/AuthApi";
import { saveToken } from "../../Functions/AuthFunctions";
import { connect } from "react-redux";
import { AUTHENTICATED } from "../../Redux/ActionTypes";
import { getAllCurriculumApi } from "../../Api/Admin/CurriculumApi";


const mapStateToProps = (state) => {
  return {

  }
}

const SignUp = (props) => {


  const [curriculum, setCurriculum] = useState([])
  const [message, setMessage] = useState('')
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setSpin(true)
    getAllCurriculumApi().then(data => {
      setSpin(false)
      if (data.error) {
        setCurriculum([])
      }
      else {
        setCurriculum([...data.data])
      }
    })
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleSignup = (data) => {

    signupApi(data).then(data => {

      if (data.error) throw data.message

      setMessage(data.message)
      saveToken(data.value.token)
      navigate('/')
      window.location.reload(false)

    })
      .catch(err => setMessage(err))

  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-[#FAF8FF]">
      <div className="shadow-lg p-10 rounded w-[500px] signup">
        <form onSubmit={handleSubmit(handleSignup)}>
          <h2 className="text-black text-center text-3xl">Sign Up</h2>

          <div>
            <label className="label">
              <span className="label-text">Signup as</span>
            </label>

            <select {...register("role", {
              required: "This field is required",
            })} name="role" id="" className="w-full select select-bordered">

              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            {errors.role && (
              <p className="text-red-400  text-xs mt-2">{errors.role?.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Curriculum</span>
            </label>

            <select {...register("curriculumId", {
              required: "This field is required",
            })} name="curriculumId" id="" className="w-full select select-bordered">

              <option value="">Select</option>
              {curriculum.map((item, index) => <option value={item._id}>{item.curriculum}</option>)}
            </select>
            {errors.curriculumId && (
              <p className="text-red-400  text-xs mt-2">{errors.curriculumId?.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("username", {
                required: "This field is required",
              })}
              name="username"
              className="input input-bordered w-full"
            />
            {errors.username && (
              <p className="text-red-400  text-xs mt-2">{errors.username?.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "This field is required",
              })}
              name="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-400  text-xs mt-2">{errors.email?.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Mobile</span>
            </label>
            <input
              type="tel"
              {...register("mobile", {
                required: "This field is required",
              })}
              name="mobile"
              className="input input-bordered w-full"
            />
            {errors.mobile && (
              <p className="text-red-400  text-xs mt-2">{errors.mobile?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  // value: 6,
                  message: "Password must be 6 character long",
                },
                pattern: {
                  // value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])./,
                  message:
                    "Password should contain at least one uppercase,lowercase & number",
                },
              })}
              name="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <button className="btn btn-accent w-full text-white">SignUp</button>

          <div className='my-4 text-center text-red-500'>{message}</div>


          <h3 className="text-sm mt-4 w-[90%] text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary">
              Please Log In
            </Link>
          </h3>

          <div className="flex flex-col w-full border-opacity-50">
            <div className="divider">OR</div>
          </div>
        </form>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(SignUp);
