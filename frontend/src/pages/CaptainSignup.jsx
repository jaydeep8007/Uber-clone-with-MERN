import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setFirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setUserData({ fullName: { firstName, lastName }, email, password });
    console.log(userData);
    // Add form submission logic here
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-20 mb-6"
            src="https://animationvisarts.com/wp-content/uploads/2023/10/image-10.png"
            alt="Logo"
          />
          <form onSubmit={submitHandler}>
            <h3 className="text-base font-medium mb-2">What's Our Captain's Name?</h3>
            <div className="flex gap-4 mb-6">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                type="text"
                placeholder="First name"
              />
              <input
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                type="text"
                placeholder="Last name"
              />
            </div>
            <h3 className="text-base font-medium mb-2">What's Our Captain's Email</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
            >
              Create Account
            </button>
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="leading-4 text-gray-700 text-[10px]">
            <p className="text-[10px] leading-tight">
              This site is protected by reCAPTCHA and the{" "}
              <span className="underline">Goog Policy</span> and{" "}
              <span className="underline"> Terms of Service apply</span>.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
