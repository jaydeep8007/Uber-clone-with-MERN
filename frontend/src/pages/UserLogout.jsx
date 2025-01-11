import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem("token");
            navigate("/login");
        }
    }).catch((error) => {
        console.error("Error logging out", error);
    })
  return (
    <div>
      
    </div>
  )
}

export default UserLogout
