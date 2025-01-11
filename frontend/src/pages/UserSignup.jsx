import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDatacontext } from "../context/UserContext";
import { useContext } from "react";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDatacontext); // Access context

  const submitHandler = async (e) => {
    e.preventDefault();

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };
    // console.log("created user", newUser);

    try {
      // Make the API call
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      // Handle successful response
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user); // Update user state
        localStorage.setItem("token" , data.token); // Save token to local storage
        navigate("/home"); // Navigate to home page
      } else {
        console.warn("Unexpected status code:", response.status);
      }
    } catch (error) {
      // Handle errors here
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-2">What's your name?</h3>
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
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your Email</h3>
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
            disabled={!(firstName && email && password)}
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
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
  );
};

export default UserSignup;
