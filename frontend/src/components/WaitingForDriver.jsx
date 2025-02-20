import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <div className="mb-12 relative">
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            onClick={() => {
              props.setWaitingForDriver(false);
            }}
            className="cursor-pointer"
            src="/arrow-down-wide-fill.png"
            alt="Close"
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <img
            className="h-12"
            src={`${props.vehiclImage}`}
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
            <h4 className="text-lg font-semibold -mt-1 mb-1 text-gray-700">{props.ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            <h2 className="text-lg font-medium text-gray-700">{`OTP : ${props.ride?.otp}`}</h2>
          </div>
        </div>

        <div className="gap-2 flex flex-col justify-center items-center">
          <div className="collection w-full">
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="map-pin-2-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium"> Pickup</h3>
                <p className="text-sm  text-gray-600">
                {props.ride?.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="square-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium"> Destination</h3>
                <p className="text-sm  text-gray-600">
                {props.ride?.destination}

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
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
