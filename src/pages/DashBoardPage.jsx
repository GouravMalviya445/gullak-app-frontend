import { useCallback, useEffect, useState } from "react"
import { InputBox, AppBar, Container, User } from "../components/index"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { config } from "../config/config";
import Skeleton from "../components/Skeleton";

const DashBoardPage = () => {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const username = location.state;
  // console.log(username)

  useEffect(() => {
    axios({
      method: "GET",
      url: config.serverUrl + "/api/v1/account/balance",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
      }
    }).then(res => setBalance(res.data.balance));
  }, [])

  const handleChange = useCallback(async function (e) {
    setFilter(e.target.value);
    setLoader(pre => !pre);
    try {
      const res = await axios.get(`${config.serverUrl}/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
        }
      });

      // filter the others users by excluding you
      let filteredUser = res.data.users.filter(user => user.username !== username);
      setUsers(filteredUser);
      setLoader(pre => !pre);
      // console.log(filteredUser)
    } catch (error) {
      setLoader(false);
      console.log("error in filtering users: ", error)
    }
  }, [filter]);

  return (
    <div>
      <AppBar className="mb-10" />
      <Container>
        {!balance ? <p className="mb-4 text-md">Loading...</p> : <p className="mb-4 text-md font-semibold text-green-600">Wallet Balance Rs {balance}</p>}

        <h3 className="mb-2 text-lg font-medium text-blue-950">Search users</h3>

        <div className="relative">

          {/* search feild */}
          <InputBox value={filter} onChange={handleChange} placeholder="firstname / lastname" type={"text"} className={"mb-4 bg-transparent"} />

          <button type="button" className="text-gray-500 absolute right-3 top-1.5">| Search</button>
        </div>
        {!loader ? <div className="px-2 space-y-5">
          {users.map(user => (
            <User userId={user.userId} key={user.userId} firstName={user.firstName} lastName={user.lastName} />
          ))}
        </div> : <Skeleton />}
      </Container>
    </div>
  )
}

export default DashBoardPage