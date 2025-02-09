
// import React from "react";

// const LocationSearchPanel = ({
//   suggestions,
//   setVehiclePanelOpen,
//   setPanelopen,
//   setPickup,
//   setDestination,
//   activeField,
// }) => {
//   const handleSuggestionClick = (suggestion) => {
//     if (activeField === "pickup") {
//       setPickup(suggestion);
//     } else if (activeField === "destination") {
//       setDestination(suggestion);
//     }
//     // setVehiclePanel(true);
//     // setPanelopen(false);
//   };

//   return (
//     <div>
//       {/* Display fetched suggestions */}
//       {suggestions.map((elem, idx) => (
//         <div
//           key={idx}
//           onClick={() => handleSuggestionClick(elem)}
//           className="bg-[#eee] h-8 flex items-center justify-center cursor-pointer"
//         >
//           <h4 className="font-medium">{elem}</h4>
      
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocationSearchPanel;


import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  return (
    <div className="bg-white  shadow-lg rounded-xl px-4 w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Select Location</h3>

      {/* Ensure suggestions exist and are an array */}
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        <div  className="space-y-2">
          {suggestions.map((elem, idx) => (
            <div
              key={elem.place_id || idx}
              onClick={() => handleSuggestionClick(elem)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3"
            >
              <span className="text-gray-700 text-sm font-medium">
                {elem.description}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-2">No suggestions found.</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
