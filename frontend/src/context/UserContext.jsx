import React, { createContext, useState } from 'react'
export const UserDatacontext = createContext()

const UserContext = ({children}) => {

    const [user, setuser] = useState({
        fullname:{
            firstName:"",
            lastName:""
        },
        email:""
    })
  return (
    <div>
        <UserDatacontext.Provider value={{}}>
            {children}
        </UserDatacontext.Provider>
    </div>
  )
}

export default UserContext
