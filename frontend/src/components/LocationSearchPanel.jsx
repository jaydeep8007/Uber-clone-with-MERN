import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "12A, Silicon Valley Lane, near CodeHub Cafe, Bengaluru",
    "45C, Innovators Street, near Techno Park, Hyderabad",
    "78D, DevHub Alley, near Hackers Cafe, Pune",
    "21E, Programmers Lane, near Algorithm Plaza, Chennai",
    "99F, Debuggers Road, near Compile Cafe, Mumbai",
  ];
  return (
    <>
      <div className="p-6 flex flex-col gap-3">
        {locations.map((v, i) => {
          return (
            <div key={i} onClick={()=>{
               props.setVehiclePanelOpen(true)
               props.setPanelOpen(false)
            }} className="active:border-2 active:border-black rounded-xl p-3 flex flex-row gap-4 justify-center items-center border-2  border-gray-400 pb-2">
              <img className="bg-cover h-full" src="/map-pin-line.png" alt="" />
              <p className="font-semibold leading-none">{v}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LocationSearchPanel;
