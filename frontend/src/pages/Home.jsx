import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide"
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        // paddingLeft:"24",
        // paddingRight:"24"
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0",
        // paddingLeft:"0",
        // paddingRight:"0"
      });
    }
  }, [panelOpen]);

  useGSAP(()=>{
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[vehiclePanelOpen])

  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[confirmRidePanel])

  useGSAP(()=>{
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(vehicleFoundRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[vehicleFound])

  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[waitingForDriver])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Logo */}
      <div>
        <img
          className="w-16 absolute top-5 left-5 mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />
      </div>

      {/* Background Image */}
      <div>
        <img 
          className="w-full h-screen  object-cover"
          src="/uber-map.png"
          alt="Uber background"
        />
      </div>

      {/* Form Section */}
      <div  className=" h-screen flex flex-col justify-end absolute w-full top-0 ">
        <div className="h-[30%] relative bg-white p-5">
          <h5
            onClick={() => {
              setPanelOpen(false);
            }}
            className={`absolute right-6 top-6 text-2xl ${
              panelOpen ? "" : "hidden"
            }`}
          >
            <img src="/arrow-down-s-line.png" alt="." />
            {/* <img src="/arrow-up-s-line.png" alt="." /> */}
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-800 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup point"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a drop point"
            />
          </form>
        </div>
        <div
          ref={panelRef}
          className={`bg-white ${panelOpen ? "h-[70%]" : "h-0"}`}
        >
          <LocationSearchPanel setPanelOpen={setPanelOpen} vehiclePanelOpen={vehiclePanelOpen}  setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="overflow-hidden translate-y-full fixed w-full  z-10 bottom-0 left-0 right-0 bg-white">
        <VehiclePanel  setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} vehiclePanelRef={vehiclePanelRef}/> 
      </div>
      <div ref={confirmRidePanelRef} className="overflow-hidden translate-y-full fixed w-full  z-10 bottom-0 left-0 right-0 bg-white">
        <ConfirmRide  setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className="overflow-hidden translate-y-full fixed w-full  z-10 bottom-0 left-0 right-0 bg-white">
        <LookingForDriver vehicleFound={vehicleFound} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef}  className="overflow-hidden  fixed w-full  z-10 bottom-0 left-0 right-0 bg-white">
        <WaitingForDriver waitingForDriver={waitingForDriver} setWaitingForDriver={setWaitingForDriver} vehicleFound={vehicleFound} setVehicleFound={setVehicleFound}/>
      </div>
      
    </div>
  );
};

export default Home;
