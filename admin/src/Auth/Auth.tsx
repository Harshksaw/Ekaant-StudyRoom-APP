import { useState } from "react";
import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "@/lib/utils";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(0);
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: 0,
    password: "",
  });
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BASEURL}/api/v1/auth/${type === "signin" ? "signin" : "signup"}`,
        {
          email: userInfo.email,
          phoneNumber: parseInt(userInfo?.phone),
          password: userInfo.password,
          accountType: "Admin",
        }
      );
      if (res.data.success) {
        console.log("signup success");
        const token = res.data.token;
        sessionStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (e) {
      alert("error while signing up");
      console.log("error is ", e);
    }
  }
  return (
    <div className="flex h-screen bg-red-500 flex-1  w-screen ">
      {/* pic  */}
      <div className="flex justify-center bg-blue-400 flex-col w-1/2">
        <div className="flex ">
          <img src={studyMain} alt="pic" width={158} height={138} />
          <p className="w-[548px] h-40 font-semibold text-9xl text-white">
            EKAANT
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src={reading} alt="pic" width={411} height={411} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-3xl">
            Lorem Ipsum <br />
            Lore Gispum sipsu
          </p>
          <p className="font-normal text-base">
            Lorem ipsum dolor sit amet, conscs <br /> ectetur adipiscing elit
            velit.
          </p>
        </div>
      </div>
      {/* main inputs  */}
      <div className="flex justify-center flex-col border w-1/2 ">
        {/* button on top */}
        <div className="border bg-blue-400 self-center absolute right-5 top-5">
          {type === "signup" ? (
            <Link to="/signin">LOGIN</Link>
          ) : (
            <Link to="/signup">REGISTER</Link>
          )}
        </div>
        <div className="block"></div>
        <div className="flex justify-center">
          <div>
            <div className="px-5">
              <h1 className="text-5xl font-bold">
                {type === "signin" ? "Login" : "Register"}
              </h1>
              <h6 className="text-base font-normal">Hello!Lets get Started</h6>
              <div className="pt-1">
                {type === "signup" ? (
                  <LabelledInput
                    type="Number"
                    label="Enter Phone Number"
                    placeholder="Phone Number"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value || 0 })
                    }
                  />
                ) : (
                  " "
                )}
                <LabelledInput
                  label="Enter Email Id"
                  placeholder="Email"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
                <LabelledInput
                  type="password"
                  label="Enter Password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                <button className="pt-1 " type="button" onClick={sendRequest}>
                  {" "}
                  {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
