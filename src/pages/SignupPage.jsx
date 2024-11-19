import { useState } from "react";
import { SubmitBtn, Heading, InputBox, BottomWarning } from "../components/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import Loading from "../components/Loading";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setLoader(pre => !pre);

        try {
            const response = await axios({
                method: "POST",
                url: config.serverUrl + "/api/v1/user/signup",
                data: {
                    username,
                    firstName,
                    lastName,
                    password
                },
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // if you successfully registered you will get a token that you need toto store in browser storage
            const accessToken = response.data?.accessToken;

            if (accessToken) {
                const auth = localStorage.getItem("auth");

                // if there is any auth key in local storage then first remove it 
                if (auth) {
                    localStorage.removeItem("auth");
                }

                // now add a new fresh auth key in local storage
                localStorage.setItem("auth", accessToken);
            }

            // if all is correct then redirect user to dashboard route
            navigate("/dashboard", { state: username });

        } catch (error) {
            setLoader(false);
            console.log("error in user signup: ", error);
        }

    }

    return !loader ? (
        <div className='h-screen w-screen text-center flex justify-center items-center bg-gray-300'>
            <div className='flex bg-white shadow-[5px_-2px_20px] shadow-black flex-col h-fit rounded-xl w-[600px] p-10'>
                <Heading heading={"Create new Account"} className={"text-blue-700 text-center"} />
                <form onSubmit={handleSubmit} action="submit" className='grid grid-cols-2 mt-9 space-y-5'>

                    {/* username field */}
                    <InputBox value={username} onChange={(e) => setUsername(e.target.value)} placeholder={"username@gmail.com"} className={"col-span-2"} label={"username"} type={"text"} />

                    {/* firstName field */}
                    <InputBox value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={"jhon"} className={"mr-2"} label={"firstname"} type={"text"} />

                    {/* lastName field */}
                    <InputBox value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={"doe"} className={"ml-3  "} label={"lastname"} type={"text"} />

                    {/* password field */}
                    <InputBox value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"123456"} className={"col-span-2"} label={"password"} type={"text"} />
                    <br />

                    {/* submit btn */}
                    <SubmitBtn className={"font-bold col-span-2 -translate-y-1 shadow-[0_2px_0_1px_darkblue] active:shadow-[0_0_0_black] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition-all ease-in-out active:translate-y-0"} label={"Sign in user"} />
                </form>
                <BottomWarning to={"/signin"} buttonText={"Sign in"} warningText={"If you already have an account you can"} />
            </div>
        </div>
    ) : <Loading />
}

export default SignupPage