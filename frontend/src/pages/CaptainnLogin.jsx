import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainnLogin = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
      const { captain, setCaptain } = useContext(CaptainDataContext);
      const navigate = useNavigate();
  
    const submitHandler =async (e) => {
      e.preventDefault();

      // setEmail("");
      // setPassword("");
      const captain = { 
        email,
         password }

         
    // Make the API call
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );
    // Handle successful response
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token); // Save token to local storage
      navigate("/captain-home");

      // Add your form submission logic here
    }
  
      console.log(captain);
    };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
    <div className="">
    <img
          className="w-20 mb-6"
          src="https://animationvisarts.com/wp-content/uploads/2023/10/image-10.png"
          alt="Logo"
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
            className="bg-[#111]  text-white font-semibold mb-5 px-4 py-2 mt-8 rounded w-full text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <p className="mb-3 flex justify-center ">
         Join a fleet?{" "}
        <Link className="text-blue-500 pl-2" to={"/captain-signup"}>
          Regester as a Captain
        </Link>
      </p>
    </div>
    <div>
      <Link
        to={"/login"}
        className=" flex justify-center bg-[#e27922] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg"
      >
        Sign in as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainnLogin
