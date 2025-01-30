import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <div className="relative px-3">
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="cursor-pointer "
            src="/arrow-down-wide-fill.png"
            alt="Close"
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <h3 className="text-2xl font-semibold mt-2 mb-1  p-2">
            New Ride Awailable!!
          </h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-yellow-300 rounded-lg  mt-1 ">
          <div className="flex items-center justify-between gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover "
              src="https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
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
          <div className=" w-full flex flex-row gap-3 my-3">
            <button
              onClick={() => {
             props.setConfirmRidePopUpPanel(true);
          
              }}
              className=" text-lg   w-full bg-green-600 text-white font-semibold p-2 rounded"
            >
             Accept
            </button>
            <button
              onClick={() => {
                props.setRidePopUpPanel(false);
              }}
              className="text-lg   w-full bg-red-500 text-white font-semibold p-2 rounded"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
