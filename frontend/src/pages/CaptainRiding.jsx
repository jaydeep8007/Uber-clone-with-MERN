import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

    const [finishRidePanel  , setFinishRidePanel] = useState(false)
const finishRidePanelRef = useRef(null)

useGSAP(()=>{
  if(finishRidePanel){
    gsap.to(finishRidePanelRef.current,{
      transform:"translateY(0)"
    })
  }else{
    gsap.to(finishRidePanelRef.current,{
      transform:"translateY(100%)"
    })
  }
},[finishRidePanel])
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="relative h-full">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 h-16 sm:h-20 p-4 flex items-center justify-between bg-white shadow-lg z-10">
          <img
            className=" max-h-8 sm:max-h-12"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
          <Link
            to="/captain-home"
            className="h-10 w-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-full transition duration-300"
          >
            <img src="/logout-box-r-line.png" alt="Logout Icon" className="w-6 h-6" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="mt-16 sm:mt-20 h-[70%]">
          <img
            className="w-full h-full object-cover rounded-lg shadow-md"
            src="/uber-map.png"
            alt="Uber Map"
          />
        </div>

        {/* Bottom Section */}
        <div onClick={()=>{
            setFinishRidePanel(true)
          }} className="h-[30%] p-6 flex flex-col justify-center bg-yellow-400 rounded-t-lg shadow-md">
          <div  className="flex justify-between items-center">
            <h4 className="text-xl sm:text-2xl font-bold text-gray-800">4 KM away</h4>
            <button className="bg-green-600 text-white font-semibold px-6 sm:px-10 py-3 rounded-lg text-sm sm:text-base shadow-lg hover:bg-green-700 transition duration-300">
              Complete Ride
            </button>
          </div>
          <h5

            className="absolute top-[70%] left-1/2 transform -translate-x-1/2 text-center p-2 text-gray-100 rounded-full shadow-lg cursor-pointer"
            onClick={() => {}}
          >
           <img src="/arrow-up-s-line.png" alt="" />
          </h5>
          <div ref={finishRidePanelRef} className="overflow-hidden translate-y-full  fixed w-full   z-10 bottom-0 left-0 right-0 bg-white">
       <FinishRide setFinishRidePanel={setFinishRidePanel}  />
      </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
