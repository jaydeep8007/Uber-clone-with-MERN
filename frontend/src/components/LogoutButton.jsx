import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

const LogoutButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showPopup) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [showPopup]);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const confirmLogout = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setShowPopup(false);
        navigate("/captain-login"); // Redirect after animation
      },
    });
  };

  const cancelLogout = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setShowPopup(false),
    });
  };

  return (
    <div>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed right-5 top-5 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
      >
        <img className="h-6 w-6" src="logout-box-r-line.png" alt="Logout Icon" />
      </button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
