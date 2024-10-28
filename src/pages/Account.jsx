import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { SubmitBtn } from '../components';
import ProfileInfo from '../components/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import { config } from "../config/config";
import Loading2 from '../components/Loading2';
import Skeleton from '../components/Skeleton';

const Account = React.memo(() => {
    const [user, setUser] = useState({});
    const [isDisable, setIsDisable] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [balance, setBalance] = useState("");
    const [loader, setLoader] = useState(false);
    const [skeleton, setSkeleton] = useState(true);

    const navigate = useNavigate();

    console.log("rerender")

    useEffect(() => {
        axios({
            method: "GET",
            url: config.serverUrl + "/api/v1/user",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
            }
        }).then(res => {
            const userData = res.data;
            setUser(userData);
            setFirstName(userData.firstName); // Set initial first name
            setLastName(userData.lastName); // Set initial last name
        }).catch(err => {
            console.error("Failed to fetch user data:", err)
        });

        // Fetch balance
        axios({
            method: "GET",
            url: config.serverUrl + "/api/v1/account/balance",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
            }
        }).then(res => {
            setBalance(res.data.balance);
        }).catch(err => {
            console.error("Failed to fetch balance:", err)
        });

        const timer = setTimeout(() => {
            setSkeleton(pre => !pre);
        }, 1000);

        return () => {
            clearTimeout(timer);
            setSkeleton(true);
        }

    }, []);


    const saveUpdatedData = useCallback(async function () {

        setLoader(pre => !pre);
        // console.log(firstName, lastName, currentPass, newPass)

        try {
            const res = await axios({
                method: "PUT",
                url: config.serverUrl + "/api/v1/user",
                data: {
                    firstName,
                    lastName,
                    oldPassword: currentPass,
                    newPassword: newPass
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("auth"),
                    "Content-Type": "application/json"
                }
            })
            console.log("user data updated successfully");
            setIsDisable(false)
            navigate("/profile")
            setLoader(pre => !pre)
        } catch (error) {
            setLoader(false);
            console.log("error in updating user data ", error);
        }

    }, [firstName, lastName, currentPass, newPass]);

    const logoutUser = useCallback(() => {
        setUser({});
        setFirstName("");
        setLastName("");
        localStorage.clear();
        navigate("/signin")
    }, []);


    return !loader ? (
        <div>
            {!skeleton ?
                <div className='grid bg-blue-100 place-items-center w-screen h-screen'>
                    <div className='grid grid-cols-6'>
                        <div className='flex flex-col col-span-2 items-center bg-blue-300 p-5 rounded-lg'>
                            <img className='h-28 rounded-full w-fit border-4' src="/profileAvatar.svg" alt="profile image" />
                            <h3 className='font-semibold text-2xl text-white mt-2'>{user.firstName + " " + user.lastName}</h3>
                            <div className='mt-3'>
                                <p className='text-green-600 text-center text-lg font-semibold'>Balance {balance ? balance : "loading"}</p>
                                <SubmitBtn onClick={logoutUser} label={"logout"} />
                            </div>
                        </div>
                        <div className='bg-green-600 space-y-4 col-span-4 p-3'>
                            {/* username/email */}
                            <ProfileInfo disabled={true} className={"text-white cursor-not-allowed"} value={user.username} label={"email"} />

                            {/* first name */}
                            <ProfileInfo value={isDisable ? user.firstName : firstName} onChange={(e) => setFirstName(e.target.value)} readOnly={isDisable} className={`text-white justify-end bg-transparent  ${isDisable ? "hover:cursor-not-allowed" : "hover:cursor-auto"}`} label={"first name"} />

                            {/* last name */}
                            <ProfileInfo value={isDisable ? user.lastName : lastName} onChange={(e) => setLastName(e.target.value)} readOnly={isDisable} className={`text-white justify-end bg-transparent  ${isDisable ? "hover:cursor-not-allowed" : "hover:cursor-auto"}`} label={"first name"} />

                            {isDisable ? (<ProfileInfo value={user.password} label={"password"} type={"password"} readOnly={true} className={`text-white justify-end bg-transparent  ${isDisable ? "hover:cursor-not-allowed" : "hover:cursor-auto"}`} />) : (
                                <div className='space-y-3'>
                                    {/* current password */}
                                    <ProfileInfo value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} type={"password"} label={"current password"} className={`text-white justify-end bg-transparent`} />

                                    {/* new password */}
                                    <ProfileInfo value={newPass} onChange={(e) => setNewPass(e.target.value)} label={"new password"} type={"password"} className={`text-white justify-end bg-transparent`} />

                                    <SubmitBtn onClick={saveUpdatedData} type={"button"} label={"Save Data"} className={"font-semibold hover:bg-blue-600 transition-all ease-in-out w-full shadow-lg"} />

                                </div>
                            )}

                            {isDisable && (
                                <SubmitBtn onClick={(e) => setIsDisable(pre => !pre)} type={"button"} label={"Update Data"} className={"font-semibold hover:bg-blue-600 transition-all ease-in-out w-full shadow-lg"} />
                            )}
                        </div>

                    </div>
                </div>
                :
                <div className='grid bg-blue-100 place-items-center w-screen h-screen'>
                    <Skeleton className={"w-1/2"} />
                </div>
            }
        </div >
    ) : <Loading2 />
})

export default Account