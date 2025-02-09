import React ,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = (props) => {

  const {captain} = useContext(CaptainDataContext)
 
 
  return (
    <div>
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9mjT_VHCdx8tDVC9djQ91q8T9IJ246jPYw&s"
                alt="User Avatar"
              />
              <h4  className="text-lg font-semibold text-gray-800">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
  
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gray-800">₹295.20</h4>
              <p className="text-sm  font-medium bg-gray-700 text-white px-3 py-1 rounded-full">
                Earned
              </p>
            </div>
          </div>

          {/* Icon Stats */}
          <div className="flex bg-slate-100 rounded-xl p-5 justify-center gap-8">
            {/* Hours Online */}
            <div className="text-center flex items-center justify-center flex-col ">
              <img
                className="text-3xl  font-thin"
                src="time-line.png"
                alt="Time Icon"
              />
              <h5 className="text-lg font-medium text-gray-800 mt-2">10.2</h5>
              <p className="text-sm text-gray-500">Hours Online</p>
            </div>

            {/* Speed Stats */}
            <div className="text-center flex items-center justify-center flex-col">
              <img
                className="text-3xl  font-thin"
                src="speed-up-line.png"
                alt="Speed Icon"
              />
              <h5 className="text-lg font-medium text-gray-800 mt-2">10.2</h5>
              <p className="text-sm text-gray-500">Speed Up</p>
            </div>

            {/* Books Read */}
            <div className="text-center flex items-center justify-center flex-col">
              <img
                className="text-3xl  font-thin"
                src="booklet-line.png"
                alt="Booklet Icon"
              />
              <h5 className="text-xlgfont-medium text-gray-800 mt-2">10.2</h5>
              <p className="text-sm text-gray-500">Books Read</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
