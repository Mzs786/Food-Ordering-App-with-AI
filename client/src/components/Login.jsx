import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const result = await login(email, password);
      
      // Successful login
      alert("Login successful!");
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
      reset({ password: "" }); // Clear password field
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signUpWithGmail();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };

      // Check if user already exists before creating
      await axiosPublic.post("/users", userInfo);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Login!</h3>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          {/* Error Messages */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button type="submit" className="btn bg-green-600 text-white">
              Login
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup Now
            </Link>
          </p>
        </form>

        {/* Social Login Buttons */}
        <div className="text-center space-x-3">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-circle hover:bg-green-600 hover:text-white"
          >
            <FaGoogle />
          </button>
          {/* Add proper handlers for these if needed */}
          <button className="btn btn-circle hover:bg-green-600 hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green-600 hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;