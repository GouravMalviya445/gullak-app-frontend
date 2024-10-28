import { useLocation, useNavigate } from "react-router-dom"
import { Heading, InputBox, SubmitBtn } from "../components"
import axios from "axios";
import React, { useCallback, useState } from "react";
import { config } from "../config/config";
import Loading2 from "../components/Loading2";

const SendPage = React.memo(() => {
  const [amount, setAmount] = useState(0);
  const [transfer, setTransfer] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const handleSubmit = useCallback(async function (e) {
    e.preventDefault();
    setTransfer(pre => !pre);

    try {
      const amt = Number(amount);

      const res = await axios({
        method: "POST",
        url: config.serverUrl + "/api/v1/account/transfer",
        data: {
          to: data.userId,
          amount: amt
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth")
        }
      });

      console.log(res.data)

      setTransfer(pre => !pre);
      navigate("/dashboard");
    } catch (error) {
      setTransfer(false);
      console.log("error in money transfer: ", error)
    }

  }, [amount])

  return !transfer ? (
    <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
      <div className="w-[320px] h-[50vh] rounded-xl shadow-xl flex flex-col justify-between bg-white px-9 p-4">
        <Heading className={"font-bold font-sans text-center mt-6"} heading={"Send Money"} />
        <div className="mb-6">
          <div className="flex space-x-3 items-center">
            <span className='px-3 py-1 font-semibold text-lg text-white rounded-full bg-green-500'>{data.firstName.at(0)}</span>
            <p className="text-xl font-semibold">{data.firstName + " " + data.lastName}</p>
          </div>
          <div className="text-xs font-semibold my-1 ml-1">Amount (in Rs)</div>
          <form onSubmit={handleSubmit} action="submit">
            <InputBox value={amount} type={"number"} onChange={(e) => setAmount(e.target.value)} placeholder={"money"} className={"mb-2 "} />
            <SubmitBtn className={"bg-gradient-to-br from-green-400 via-green-500 to-green-400 shadow-md text-sm py-1.5 w-full font-semibold"} label={"Initiate money"} />
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loading2 />
  )
})

export default SendPage