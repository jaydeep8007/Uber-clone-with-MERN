import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ConfirmRidePopUp = (props) => {
  const [ otp, setOtp ] = useState('')
  const navigate = useNavigate()

  const submitHander = async (e) => {
      e.preventDefault()

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
          params: {
              rideId: props.ride._id,
              otp: otp
          },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          props.setConfirmRidePopUpPanel(false)
          props.setRidePopUpPanel(false)
          navigate('/captain-riding', { state: { ride: props.ride } })
      }
}

  return (
    <div>
      <div className="relative px-3">
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 firstslate-y-1/2">
          {/* <img
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="cursor-pointer "
            src="/arrow-down-wide-fill.png"
            alt="Close"
          /> */}
        </div>
        <div className="flex justify-between items-center mt-8">
          <h3 className="text-2xl font-semibold mt-2 mb-1  p-2">
            Confirm This Ride To Start
          </h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-yellow-300 rounded-lg  mt-1 ">
          <div className="flex items-center justify-between gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover "
              src="https://media.licdn.com/dms/image/v2/D5603AQHhwgjSaHYZ2Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1666341853137?e=2147483647&v=beta&t=hocXcNj5WFXEQ3ltGCPjnblr8I-_qGPJL_TKf2N4X8g"
              alt="Profile"
            />
            <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname}</h2>
          </div>
          <h5 className="text-lg font-semibold">2.2 KM</h5>
        </div>

        <div className="gap-2 flex flex-col justify-center items-center">
          <div className="collection w-full">
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="map-pin-2-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
                <p className="text-sm  text-gray-600">
                 
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="square-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
                <p className="text-sm  text-gray-600">
                  
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="currency-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                <p className="text-sm  text-gray-600">cash cash</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 my-3">
          <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)

                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
