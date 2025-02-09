import React, { useRef, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";


const CaptainHome = () => {
const [ridePopUpPanel, setRidePopUpPanel] = useState(true )
const ridePopUpPanelRef = useRef(null)

const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
const confirmRidePopUpPanelRef = useRef(null)

const {socket} = useContext(SocketContext)
const {captain} = useContext(CaptainDataContext)


useEffect(() => {
  console.log(captain)
 socket.emit("join",{
  userId:captain._id,
  
  userType:"captain"
 })
})


useGSAP(()=>{
  if(ridePopUpPanel){
    gsap.to(ridePopUpPanelRef.current,{
      transform:"translateY(0)"
    })
  }else{
    gsap.to(ridePopUpPanelRef.current,{
      transform:"translateY(100%)"
    })
  }
},[ridePopUpPanel])

useGSAP(()=>{
  if(confirmRidePopUpPanel){
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:"translateY(0)"
    })
  }else{
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:"translateY(100%)"
    })
  }
},[confirmRidePopUpPanel])


  return (
    <div className="h-screen ">
      {/* Logo */}
      <div className="absolute top-5 left-5">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />
      </div>

      {/* Logout Button */}
      <Link
        to="/captain-login"
        className="fixed right-5 top-5 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
      >
        <img
          className="h-6 w-6"
          src="logout-box-r-line.png"
          alt="Logout Icon"
        />
      </Link>

      {/* Map Section */}
      <div className="h-[60%]">
        <img
          className="w-full h-full object-cover"
          src="/uber-map.png"
          alt="Uber Map"
        />
      </div>

      {/* Content Section */}
      <div className="h-[40%] py-3 px-2">
        {/* User Info and Earnings */}
      <CaptainDetails/>
      </div>
      <div ref={ridePopUpPanelRef} className="overflow-hidden  fixed w-full  z-10 bottom-0 left-0 right-0 bg-white">
       <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={confirmRidePopUpPanelRef} className="overflow-hidden translate-y-full  fixed w-full h-screen  z-10 bottom-0 left-0 right-0 bg-white">
       <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
