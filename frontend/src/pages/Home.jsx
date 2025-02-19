import React, { useRef, useState ,useContext , useEffect} from "react";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDatacontext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [fare, setFare] = useState({});
  const [ride, setRide] = useState(null);

  const navigate = useNavigate()

      const { socket } = useContext(SocketContext)
      const { user } = useContext(UserDatacontext)
      
  
      useEffect(() => {
        console.log(user)
          socket.emit("join", { userType: "user", userId: user._id })
      }, [ user ])
  
      socket.on('ride-confirmed', ride => {
  // console.log("ride confirmed socket on")
          setVehicleFound(false)
          setWaitingForDriver(true)
          setRide(ride)
      })
  
      socket.on('ride-started', ride => {
          console.log("ride started sockett on navigate to riding")
          setWaitingForDriver(false)
          navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
      })

    
  

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

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

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setFare(response.data);
  }
  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

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

      {/* Background Live Map */}
      <div  className="w-full h-screen  object-cover">
        <LiveTracking/>
        {/* <img
          className="w-full h-screen  object-cover"
          src="/uber-map.png"
          alt="Uber background"
        /> */}
      </div>

{/* Form Section */}
<div className="h-screen flex flex-col justify-end absolute w-full top-0">
  <div className="relative bg-white p-6 rounded-t-xl shadow-xl">
    {/* Close Button */}
    {panelOpen && (
      <button
        onClick={() => setPanelOpen(false)}
        className="absolute right-6 top-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <img src="/arrow-down-s-line.png" alt="Close Panel" className="w-6 h-6" />
      </button>
    )}

    {/* Heading */}
    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Find a Trip</h4>

    {/* Form */}
    <form onSubmit={submitHandler} className="relative space-y-4">
      {/* Vertical Line */}
      <div className="absolute left-7 top-[30%] h-14 w-1 bg-gray-800 rounded-full"></div>

      {/* Pickup Input */}
      <input
        onClick={() => {
          setPanelOpen(true);
          setActiveField("pickup");
        }}
        value={pickup}
        onChange={handlePickupChange}
        className="bg-gray-100 px-12 py-3 text-lg rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Add a pick-up location"
      />

      {/* Destination Input */}
      <input
        onClick={() => {
          setPanelOpen(true);
          setActiveField("destination");
        }}
        value={destination}
        onChange={handleDestinationChange}
        className="bg-gray-100 px-12 py-3 text-lg rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter your destination"
      />

      {/* Find Trip Button */}
      <button
        onClick={findTrip}
        className="bg-black text-white px-5 py-3 rounded-lg w-full font-medium text-lg transition-all duration-200 ease-in-out hover:bg-gray-900 active:scale-95"
      >
        Find Trip
      </button>
    </form>
  </div>

  {/* Location Search Panel - Visible when panelOpen is true */}
  <div
    ref={panelRef}
    className={`bg-white w-full overflow-hidden  ${
      panelOpen ? "h-full p-4 shadow-lg" : "h-0 p-0"
    }`}
  >
    <LocationSearchPanel
      suggestions={
        activeField === "pickup" ? pickupSuggestions : destinationSuggestions
      }
      setPanelOpen={setPanelOpen}
      setVehiclePanelOpen={setVehiclePanelOpen}
      setPickup={setPickup}
      setDestination={setDestination}
      activeField={activeField}
    />
  </div>
</div>

      <div
        ref={vehiclePanelRef}
        className="overflow-hidden translate-y-full fixed w-full   bottom-0 left-0 right-0 bg-white"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          vehiclePanelRef={vehiclePanelRef}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className={`overflow-hidden translate-y-full fixed w-full z-10 -bottom-10 pb-10 left-0 right-0 bg-white`}
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className={`  overflow-hidden translate-y-full fixed w-full z-10 -bottom-10 pb-10 left-0 right-0 bg-white`}
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          vehicleFound={vehicleFound}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="overflow-hidden  fixed w-full  z-10 bottom-0 left-0 right-0 bg-white"
      >
        <WaitingForDriver
        ride={ride}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
          vehicleFound={vehicleFound}
          setVehicleFound={setVehicleFound}
        />
      </div>
    </div>
  );
};

export default Home;

// import React, { useEffect, useRef, useState } from 'react'
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import axios from 'axios';
// import 'remixicon/fonts/remixicon.css'
// import LocationSearchPanel from '../components/LocationSearchPanel';
// import VehiclePanel from '../components/VehiclePanel';
// import ConfirmRide from '../components/ConfirmRide';
// import LookingForDriver from '../components/LookingForDriver';
// import WaitingForDriver from '../components/WaitingForDriver';
// // import { SocketContext } from '../context/SocketContext';
// import { useContext } from 'react';
// import { UserDatacontext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// // import LiveTracking from '../components/LiveTracking';

// const Home = () => {
//     const [ pickup, setPickup ] = useState('')
//     const [ destination, setDestination ] = useState('')
//     const [ panelOpen, setPanelOpen ] = useState(false)
//     const vehiclePanelRef = useRef(null)
//     const confirmRidePanelRef = useRef(null)
//     const vehicleFoundRef = useRef(null)
//     const waitingForDriverRef = useRef(null)
//     const panelRef = useRef(null)
//     const panelCloseRef = useRef(null)
//     const [ vehiclePanel, setVehiclePanel ] = useState(false)
//     const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
//     const [ vehicleFound, setVehicleFound ] = useState(false)
//     const [ waitingForDriver, setWaitingForDriver ] = useState(false)
//     const [ pickupSuggestions, setPickupSuggestions ] = useState([])
//     const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
//     const [ activeField, setActiveField ] = useState(null)
//     const [ fare, setFare ] = useState({})
//     const [ vehicleType, setVehicleType ] = useState(null)
//     const [ ride, setRide ] = useState(null)

//     const navigate = useNavigate()

//     // const { socket } = useContext(SocketContext)
//     const { user } = useContext(UserDatacontext)

//     // useEffect(() => {
//     //     socket.emit("join", { userType: "user", userId: user._id })
//     // }, [ user ])

//     // socket.on('ride-confirmed', ride => {

//     //     setVehicleFound(false)
//     //     setWaitingForDriver(true)
//     //     setRide(ride)
//     // })

//     // socket.on('ride-started', ride => {
//     //     console.log("ride")
//     //     setWaitingForDriver(false)
//     //     navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
//     // })

//     const handlePickupChange = async (e) => {
//         setPickup(e.target.value)
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
//                 params: { input: e.target.value },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }

//             })
//             setPickupSuggestions(response.data)
//         } catch {
//             // handle error
//         }
//     }

//     const handleDestinationChange = async (e) => {
//         setDestination(e.target.value)
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
//                 params: { input: e.target.value },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             setDestinationSuggestions(response.data)
//         } catch {
//             // handle error
//         }
//     }

//     const submitHandler = (e) => {
//         e.preventDefault()
//     }

//     useGSAP(function () {
//         if (panelOpen) {
//             gsap.to(panelRef.current, {
//                 height: '70%',
//                 padding: 24
//                 // opacity:1
//             })
//             gsap.to(panelCloseRef.current, {
//                 opacity: 1
//             })
//         } else {
//             gsap.to(panelRef.current, {
//                 height: '0%',
//                 padding: 0
//                 // opacity:0
//             })
//             gsap.to(panelCloseRef.current, {
//                 opacity: 0
//             })
//         }
//     }, [ panelOpen ])

//     useGSAP(function () {
//         if (vehiclePanel) {
//             gsap.to(vehiclePanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(vehiclePanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ vehiclePanel ])

//     useGSAP(function () {
//         if (confirmRidePanel) {
//             gsap.to(confirmRidePanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(confirmRidePanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ confirmRidePanel ])

//     useGSAP(function () {
//         if (vehicleFound) {
//             gsap.to(vehicleFoundRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(vehicleFoundRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ vehicleFound ])

//     useGSAP(function () {
//         if (waitingForDriver) {
//             gsap.to(waitingForDriverRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(waitingForDriverRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ waitingForDriver ])

//     async function findTrip() {
//         setVehiclePanel(true)
//         setPanelOpen(false)

//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
//             params: { pickup, destination },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         setFare(response.data)

//     }

//     async function createRide() {
//         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
//             pickup,
//             destination,
//             vehicleType
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//     }

//     return (
//         <div className='h-screen relative overflow-hidden'>
//             <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
//             <div className='h-screen w-screen'>
//                 {/* image for temporary use  */}
//                 {/* <LiveTracking /> */}
//             </div>
//             <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
//                 <div className='h-[30%] p-6 bg-white relative'>
//                     <h5 ref={panelCloseRef} onClick={() => {
//                         setPanelOpen(false)
//                     }} className='absolute opacity-0 right-6 top-6 text-2xl'>
//                         <i className="ri-arrow-down-wide-line"></i>
//                     </h5>
//                     <h4 className='text-2xl font-semibold'>Find a trip</h4>
//                     <form className='relative py-3' onSubmit={(e) => {
//                         submitHandler(e)
//                     }}>
//                         <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
//                         <input
//                             onClick={() => {
//                                 setPanelOpen(true)
//                                 setActiveField('pickup')
//                             }}
//                             value={pickup}
//                             onChange={handlePickupChange}
//                             className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
//                             type="text"
//                             placeholder='Add a pick-up location'
//                         />
//                         <input
//                             onClick={() => {
//                                 setPanelOpen(true)
//                                 setActiveField('destination')
//                             }}
//                             value={destination}
//                             onChange={handleDestinationChange}
//                             className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
//                             type="text"
//                             placeholder='Enter your destination' />
//                     </form>
//                     <button
//                         onClick={findTrip}
//                         className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
//                         Find Trip
//                     </button>
//                 </div>
//                 <div ref={panelRef} className='bg-white h-0'>
//                     <LocationSearchPanel
//                         suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
//                         setPanelOpen={setPanelOpen}
//                         setVehiclePanel={setVehiclePanel}
//                         setPickup={setPickup}
//                         setDestination={setDestination}
//                         activeField={activeField}
//                     />
//                 </div>
//             </div>
//             <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <VehiclePanel
//                     selectVehicle={setVehicleType}
//                     fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
//             </div>
//             <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
//                 <ConfirmRide
//                     createRide={createRide}
//                     pickup={pickup}
//                     destination={destination}
//                     fare={fare}
//                     vehicleType={vehicleType}

//                     setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
//             </div>
//             <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
//                 <LookingForDriver
//                     createRide={createRide}
//                     pickup={pickup}
//                     destination={destination}
//                     fare={fare}
//                     vehicleType={vehicleType}
//                     setVehicleFound={setVehicleFound} />
//             </div>
//             <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
//                 <WaitingForDriver
//                     ride={ride}
//                     setVehicleFound={setVehicleFound}
//                     setWaitingForDriver={setWaitingForDriver}
//                     waitingForDriver={waitingForDriver} />
//             </div>
//         </div>
//     )
// }

// export default Home
