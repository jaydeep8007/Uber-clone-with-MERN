import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <div className="relative">
        <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            onClick={() => {
                props.setVehicleFound(false)
            }}
            className="cursor-pointer h-10"
            src="https://i.gifer.com/origin/8b/8b4d5872105584fe9e2d445bea526eb5_w200.gif"
            alt="Close"
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <h3 className="text-2xl font-semibold mt-4 mb-5 ml-5 p-2">
            Looking For Driver
          </h3>
        </div>
        <div className="gap-2 flex flex-col justify-center items-center">
          <img
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="UberX Capacity"
            className=" h-24"
          />
          <div className="collection  w-full">
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="map-pin-2-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium">Pickup</h3>
                <p className="text-sm  text-gray-600">
                {props.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="square-fill.png" alt="" />

              <div className="">
                <h3 className="text-lg font-medium"> Destination</h3>
                <p className="text-sm  text-gray-600">
                {props.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 border-b-2">
              <img className="h-fit" src="currency-fill.png"  alt="" />

              <div className="">
                <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
                <p className="text-sm  text-gray-600">
                  cash cash
                </p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver
