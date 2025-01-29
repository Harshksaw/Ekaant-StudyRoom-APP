import { useState } from "react";
import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "@/lib/utils";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
const Auth = ({ type }: { type: "signin" }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: 0,
    password: "",
  });

  const [password, setPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!userInfo.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!userInfo.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function sendRequest() {
    if (!validateForm()) {
      return;
    }

    if (type === "signin") {
      try {
        setLoading(true);
        const response = await axios.post(
          `${BASEURL}/api/v1/admin/loginAdmin`,
          {
            email: userInfo.email,
            password: userInfo.password,
          }
        );

        if (response.data.success) {
          console.log("🚀 ~ sendRequest ~ response:", response);

          const token = response.data.token;
          const accountType = response.data.data.accountType;
          const accountId = response.data.data.id;

          localStorage.setItem("token", token);
          localStorage.setItem("userId", accountId);
          localStorage.setItem("role", accountType);

          const role = localStorage.getItem("role");
          setLoading(false);

          if (role === "Owner") {
            navigate("/admin");
            window.location.reload();
            return;
          }

          if (!response?.data?.hasRooms) {
            toast.info(
              "You don't have any rooms yet. Please create a room to continue."
            );
            navigate("/manage-library/create-room");
            window.location.reload();
          } else {
            role && role === "Admin"
              ? navigate("/dashboard")
              : navigate("/admin", { replace: true });
          }
        } else {
          setLoading(false);
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error) && error.response) {
          const { status, data } = error.response;

          if (status === 401) {
            toast.error("Invalid email or password.");
          } else {
            toast.error(
              data.message || "Something went wrong. Please try again."
            );
          }
        } else {
          console.error("Unexpected error during login:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  }

  return (
    <div className="flex h-screen flex-1 w-screen">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-400 to-sky-700 w-1/2">
        <div className="flex justify-center items-center gap-10">
          <img src={studyMain} alt="pic" width={100} height={100} />
          <p className="h-30 font-semibold text-7xl text-white">EKAANT</p>
        </div>

        <div className="flex justify-center items-center">
          <img src={reading} alt="pic" width={400} height={400} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-white text-3xl">
            Welcome to Ekaant Library Portal
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center flex-col border w-1/2 p-5">
        <div className="self-end mb-5">
          {type === "signin" ? (
            <Link
              to="/signup"
              className="absolute top-0 right-0 mt-10 mr-8 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-4 rounded-xl"
            >
              Register
            </Link>
          ) : (
            <Link
              to="/signin"
              className="absolute top-0 right-0 mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-4 rounded-full"
            >
              LOGIN
            </Link>
          )}
        </div>
        <div className="w-full max-w-md">
          <h1 className="text-5xl font-bold mb-2 text-center">
            {type === "signin" ? "Login" : "Register"}
          </h1>
          <h6 className="text-base font-normal mb-4 text-center">
            Hello! Let's get started
          </h6>
          <div className="px-20">
            {/* Email Input */}
            <div className="mb-4 ">
              <LabelledInput
                label="Enter Email Id"
                placeholder="Email"
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value.toLowerCase(),
                  })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-3">{errors.email}</p>
              )}
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label className="font-semibold text-[14px]">
                Enter Password
              </label>
              <div className="relative">
                <input
                  type={password ? "text" : "password"}
                  placeholder="Password"
                  value={userInfo.password}
                  className="text-gray-900 h-[50px] border-black rounded-xl text-sm block w-full p-2.5 pr-10"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                <p
                  className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 "
                  onClick={() => setPassword(!password)}
                >
                  {password ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </p>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm ml-3">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader />
                </div>
              ) : (
                <button
                  className="w-full h-[50px] border-black  bg-gradient-to-r from-sky-500 to-blue-300 text-white py-2 px-4 rounded-xl mt-1 hover:bg-blue-600"
                  type="button"
                  onClick={sendRequest}
                >
                  {type === "signin" ? "Sign In" : "Sign Up"}
                </button>
              )}
            </div>

            <div className="mt-2">
              <Link to="/forgot-password">
                <p className="ml-40 text-blue-500">Forgot Password</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
