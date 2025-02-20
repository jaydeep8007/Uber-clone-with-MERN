import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";

import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import LogoutButton from "../components/LogoutButton";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpPanelRef = useRef(null);

  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    //port forwarding is provided by vscode itself so we use this here to make the captain join the room with thesame id as the captain
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
    console.log("ride created")
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanel]);

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
      <LogoutButton/>
      {/* <Link
        to="/captain-login"
        className="fixed right-5 top-5 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
      >
        <img
          className="h-6 w-6"
          src="logout-box-r-line.png"
          alt="Logout Icon"
        />
      </Link> */}

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
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpPanelRef}
        className="overflow-hidden  fixed w-full  z-10 bottom-0 left-0 right-0 bg-white"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelRef}
        className="overflow-hidden translate-y-full  fixed w-full h-screen  z-10 bottom-0 left-0 right-0 bg-white"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
