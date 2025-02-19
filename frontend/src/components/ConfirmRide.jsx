import React from "react";

const ConfirmRide = (props) => {
  return (
    <>
      <div className="  relative">
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            onClick={() => {
              props.setConfirmRidePanel(false);
            }}
            className="cursor-pointer "
            src="/arrow-down-wide-fill.png"
            alt="Close"
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <h3 className="text-2xl font-semibold mt-2 mb-5 ml-5 p-2">
            Confirm your ride
          </h3>
        </div>
        <div className="gap-2 flex flex-col justify-center items-center">
          <img
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="UberX Capacity"
            className=" h-24"
          />
          <div className="collection w-full">
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="map-pin-2-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">Pickup</h3>
                <p className="text-sm mt-1 text-gray-600">
                  {props.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="square-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">Destination</h3>
                <p className="text-sm mt-1 text-gray-600">
                {props.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="currency-fill.png"  alt="" />

              <div className="">
                <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
                <p className="text-sm mt-1 text-gray-600">
                  cash Cash
                </p>
              </div>
            </div>
          </div>
          <button  onClick={()=>{
            props.setVehicleFound(true)
            props.setConfirmRidePanel(false)
            props.createRide()
            
          }} className=" scale-95 my-3 w-full bg-green-600 text-white font-semibold p-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmRide;
