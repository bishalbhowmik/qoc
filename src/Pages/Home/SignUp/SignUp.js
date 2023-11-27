import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignUp.css";

const SignUp = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignup = (data) => {
    const userInfo = { displayName: data.name };
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (user.uid) {
          toast.success("User Registered Successfully please login");
          navigate("/");
          window.location.reload();
        }

        updateUser(userInfo)
          .then(() => {})
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-[#FAF8FF]">
      <div className="shadow-lg p-10 rounded w-[500px] signup">
        <form onSubmit={handleSubmit(handleSignup)}>
          <h2 className="text-black text-center text-3xl">Sign Up</h2>
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
              name="name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-gray-500">{errors.name?.message}</p>
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
              <p className="text-gray-500">{errors.email?.message}</p>
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
                  value: 6,
                  message: "Password must be 6 character long",
                },
                pattern: {
                  value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])./,
                  message:
                    "Password should contain at least one uppercase,lowercase & number",
                },
              })}
              name="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-gray-600 text-xs mt-2">
                {errors.password?.message}
              </p>
            )}
          </div>

          <button className="btn btn-accent w-full text-white">SignUp</button>

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

export default SignUp;
