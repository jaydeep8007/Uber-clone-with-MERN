import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setUserData({ email, password });

    console.log(userData);
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div className="">
        <img
          className="w-16 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)} action="">
          <div className="">
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              placeholder="example@email.com"
              type="text"
            />
            <h3 className="text-lg font-medium mt-5">Enter password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              placeholder="password"
              type="password"
            />
            <button
              className="bg-[#111]  text-white font-semibold mb-7 px-4 py-2 mt-8 rounded w-full text-lg placeholder:text-base"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mb-3 flex justify-center ">
          New here?{" "}
          <Link className="text-blue-500 pl-2" to={"/signup"}>
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className=" flex justify-center bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
