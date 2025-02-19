import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

          rideId: props.ride._id


      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          navigate('/captain-home')
      }

  }
  return (
   <div>
         <div className="relative px-3">
           <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 firstslate-y-1/2">
             <img
               onClick={() => {
                 props.setFinishRidePanel(false);
               }}
               className="cursor-pointer "
               src="/arrow-down-wide-fill.png"
               alt="Close"
             />
           </div>
           <div className="flex justify-between items-center mt-8">
             <h3 className="text-2xl font-semibold mt-2 mb-1  p-2">
               Finish This Ride
             </h3>
           </div>
           <div className="flex items-center justify-between p-5 border-2 border-yellow-300 bg-yellow-50 rounded-lg  mt-1 ">
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
                   <h3 className="text-lg font-medium">Pickup</h3>
                   <p className="text-sm  text-gray-600">
                    {props.ride?.pickup}
                   </p>
                 </div>
               </div>
               <div className="flex items-center gap-4 p-3 border-b-2">
                 <img className="h-fit" src="square-fill.png" alt="" />
   
                 <div className="">
                   <h3 className="text-lg font-medium">Destination</h3>
                   <p className="text-sm  text-gray-600">
                   {props.ride?.destination}
                   </p>
                 </div>
               </div>
               <div className="flex items-center gap-4 p-3 border-b-2">
                 <img className="h-fit" src="currency-fill.png" alt="" />
   
                 <div className="">
                   <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
                   <p className="text-sm  text-gray-600">cash cash</p>
                 </div>
               </div>
             </div>
             <div className="w-full flex flex-col gap-4 my-3">
             <button 
             onClick={endRide}
                className="text-lg flex justify-center items-center w-full bg-blue-500 text-white font-semibold p-2 rounded-lg"
              >
               Finish Ride
              </button>
             </div>
           </div>
         </div>
       </div>
  )
}

export default FinishRide
