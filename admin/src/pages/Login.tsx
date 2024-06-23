import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex justify-center w-full h-screen items-center">
      <div className="flex gap-8 flex-col  w-full rounded-xl  bg-white shadow-md border max-w-sm p-8">
        {/* header */}
        <div className="space-y-6">
          <h1 className="max-w-xs text-3xl text-center font-semibold">
            Login {""}
          </h1>
          {/*TODO- image add */}
        </div>
        {/* Input container */}
        <div className="space-y-4 ">
          {/* email */}
          <div className="">
            <input
              className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
            />
          </div>

          {/* password */}
          <div className="">
            <input
              className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
              value={password}
              placeholder="password"
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {/*  */}
          <div className="flex flex-col justify-center">
            <button
              className="py-5 px-20 rounded-lg mx-4 mt-4"
              onClick={() => handleLogin()}
            >
              <span className="text-center text-lg font-bold">Sign Up</span>
            </button>

            <button
              className="py-4 px-16 rounded-lg mx-4 mb-25"
              onClick={() => navigate(-1)}
            >
              <span className="text-center text-lg font-bold">Cancel</span>
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
