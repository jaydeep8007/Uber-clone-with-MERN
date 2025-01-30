import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
const [otp, setOtp] = useState("")

const submitHandler=(e)=>{
e.preventDefault()
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
            <h2 className="text-lg font-medium">Harsh Patel</h2>
          </div>
          <h5 className="text-lg font-semibold">2.2 KM</h5>
        </div>

        <div className="gap-2 flex flex-col justify-center items-center">
          <div className="collection w-full">
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="map-pin-2-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm  text-gray-600">
                  Kankariya Talab, Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="square-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">Third wave , Cofee</h3>
                <p className="text-sm  text-gray-600">
                  17th crossroad ,near black bull market , Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="currency-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">$11.99</h3>
                <p className="text-sm  text-gray-600">cash cash</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 my-3">
            <form onSubmit={()=>{
              subitHandler(e)
            }} className="w-full flex flex-col gap-4 my-3" action="">
              <input
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
                type="number"
                inputMode="numeric"
                className="bg-[#eee] text-lg border-2 border-gray-400 text-center w-full font-semibold p-2 rounded-lg"
                placeholder="Enter OTP"
                onInput={(e) => {
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6); // Restrict to 6 digits
                  }
                }}
              />

              <Link
                to="/captain-riding"
                className="text-lg w-full bg-green-600 text-white font-semibold p-2 rounded-lg inline-block text-center"
              >
                Confirm
              </Link>
              <button
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                  props.setRidePopUpPanel(false);
                }}
                className="text-lg   w-full bg-red-500 text-white font-semibold p-2 rounded-lg"
              >
                Cancle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
