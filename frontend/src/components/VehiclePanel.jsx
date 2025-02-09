import React from "react";

const VehiclePanel = (props) => {
  return (
    <div >
   <div className="relative">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <img
      onClick={() => {
        props.setVehiclePanelOpen(false);
      }}
      className="cursor-pointer "
      src="/arrow-down-wide-fill.png"
      alt="Close"
    />
    
  </div>
  <div className="flex justify-between items-center mt-8">
    <h3 className="text-2xl font-semibold mt-2 mb-5 ml-5 p-2">Choose A Vehicle</h3>
  </div>
</div>

      <div  onClick={()=>{
      props.setConfirmRidePanel(true)
    
      props.setVehicleType('car')
    }} className=" scale-90 w-full flex justify-between items-center border-2  active:border-black rounded-xl p-3  ">
        <div>
          <img
            className="h-20"
            src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
            alt="UberGO"
          />
        </div>
        <div className="w-1/2">
          <div className="font-medium flex items-center  gap-2">
            <span>UberGO</span>
            <img className="h-4" src="/user-3-fill.png" alt="" />
            <span>2</span>
          </div>
          <p>
            <span className="pr-2 text-sm"> 2</span>minutes away
          </p>
          <h4 className="text-xs text-gray-500">Affordable ,compact rides</h4>
        </div>
        <div className="text-lg pr-2  font-semibold">₹{props.fare.car}</div>
      </div>
      <div  onClick={()=>{
      props.setConfirmRidePanel(true)
      props.setVehicleType('motorcycle')
    }} className=" scale-90 w-full flex justify-between items-center border-2 active:border-black  rounded-xl p-3  ">
        <div>
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt="UberGO"
          />
        </div>
        <div className="w-1/2">
          <div className="font-medium flex items-center  gap-2">
            <span>Moto</span>
            <img className="h-4" src="/user-3-fill.png" alt="" />
            <span>1</span>
          </div>
          <p>
            <span className="pr-2 text-sm"> 1</span>minutes away
          </p>
          <h4 className="text-xs text-gray-500">Affordable, motorcycle rides</h4>
        </div>
        <div className="text-lg pr-2  font-semibold">₹{props.fare.motorcycle}</div>
      </div>
      <div  onClick={()=>{
      props.setConfirmRidePanel(true)
      props.setVehicleType('auto')
    }} className=" scale-90 w-full flex justify-between items-center border-2 active:border-black  rounded-xl p-3  ">
        <div>
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt="UberGO"
          />
        </div>
        <div className="w-1/2">
          <div className="font-medium flex items-center  gap-2">
            <span>Auto</span>
            <img className="h-4" src="/user-3-fill.png" alt="" />
            <span>3</span>
          </div>
          <p>
            <span className="pr-2 text-sm"> 5</span>minutes away
          </p>
          <h4 className="text-xs text-gray-500">Affordable, auto rides</h4>
        </div>
        <div className="text-lg pr-2  font-semibold">₹{props.fare.auto}</div>
      </div>
    </div>
  );
};

export default VehiclePanel;
