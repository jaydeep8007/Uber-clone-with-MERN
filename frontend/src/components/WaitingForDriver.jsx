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
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Popu</h2>
            <h4 className="text-xl font-semibold -mt-1 mb-1">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="gap-2 flex flex-col justify-center items-center">
          <div className="collection w-full">
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="map-pin-2-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm mt-1 text-gray-600">
                  Kankariya Talab, Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="square-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">Third wave , Cofee</h3>
                <p className="text-sm mt-1 text-gray-600">
                  17th crossroad ,near black bull market , Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="currency-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">$11.99</h3>
                <p className="text-sm mt-1 text-gray-600">cash cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
