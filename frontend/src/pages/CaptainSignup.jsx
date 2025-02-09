import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    // setEmail('')
    // setFirstName('')
    // setLastName('')
    // setPassword('')
    // setVehicleColor('')
    // setVehiclePlate('')
    // setVehicleCapacity('')
    // setVehicleType('')

  }

  return (
    <div className="p-4 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-4"
          src="https://animationvisarts.com/wp-content/uploads/2023/10/image-10.png"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-1">
            What's Our Captain's Name?
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-base font-medium mb-1">
            What's Our Captain's Email
          </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-4 rounded px-3 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-1">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-4 rounded px-3 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Password"
          />
          <h3 className="text-base font-medium mb-1">Vehicle Information</h3>
          <div className="flex gap-2 mb-4">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-sm"
            >
              <option value="" disabled>
                Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="Vehicle Color"
            />
          </div>
          <div className="flex gap-2 mb-4">
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="Vehicle plate"
            />
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-3 py-2 border text-base placeholder:text-sm"
              type="number"
              placeholder="Capacity (Seats)"
            />
          </div>
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-2 rounded px-3 py-2 w-full text-base"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-base">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="leading-4 text-gray-700 text-[10px]">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
