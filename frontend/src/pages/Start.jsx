import React from 'react'
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
       <div className=" bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8  flex flex-col h-screen w-full justify-between  ">
        <img
          className="w-24 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white py-4 px-5 pb-7 justify-center items-center">
          <div className="text-2xl font-bold">Get Started With Uber</div>
          <Link to={"/login"} className=" flex items-center justify-center w-full text-xl h-[6vh] bg-black text-white rounded-lg mt-4">
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
