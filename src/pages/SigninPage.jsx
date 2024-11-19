import axios from "axios";
import { SubmitBtn, Heading, InputBox, BottomWarning } from "../components/index"
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import Loading from "../components/Loading";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(async function (e) {
    e.preventDefault();

    setLoader(pre => !pre);

    try {
      const res = await axios({
        method: "POST",
        url: config.serverUrl + "/api/v1/user/signin",
        data: {
          username,
          password
        },
        headers: {
          "Content-Type": "application/json"
        }

      }, [username, password]);

      // if user successfully logged in then they will send accessToken
      const accessToken = res.data?.accessToken;
      if (accessToken) {
        const token = res.data.accessToken;

        const auth = localStorage.getItem("auth");

        // if auth key is already exist then remove it first
        if (auth) {
          localStorage.removeItem("auth");
        }

        // add new auth key
        localStorage.setItem("auth", token);

        // navigate the user to dashboard page
        navigate("/dashboard", { state: username })
      }
    } catch (error) {
      setLoader(false);
      console.log("Error in signin: ", error);
    }

  })

  return !loader ? (
    <div className='h-screen w-screen text-center flex justify-center items-center bg-gray-300'>
      <div className='flex bg-white h-fit shadow-[5px_-2px_20px] shadow-black flex-col rounded-xl w-[500px] p-10'>
        <Heading heading={"Sign in your Account"} className={"text-blue-700 text-center"} />
        <form onSubmit={handleSubmit} action="submit" className='grid grid-cols-1 mt-10'>

          {/* username field */}
          <InputBox placeholder={"name123@gmail.com"} value={username} onChange={(e) => setUsername(e.target.value)} label={"username"} type={"text"} />
          <br />

          {/* password field */}
          <InputBox placeholder={"123456"} value={password} onChange={(e) => setPassword(e.target.value)} label={"password"} type={"text"} />
          <br />

          {/* submit btn */}
          <SubmitBtn className={"font-bold mt-8 -translate-y-1 shadow-[0_2px_0_1px_darkblue] active:shadow-[0_0_0_black] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition-all ease-in-out active:translate-y-0"} label={"Sign in user"} />
        </form>
        <BottomWarning to={"/signup"} buttonText={"Sign up"} warningText={"If you don't have any account you can"} />
      </div>
    </div>
  ) : <Loading />
}

export default SigninPage;