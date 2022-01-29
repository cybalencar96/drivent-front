import { createContext, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [changeRoomMode, setChangeRoomMode] = useState(false);
  
  return (
    <UserContext.Provider value={{
      userData,
      setUserData,
      changeRoomMode,
      setChangeRoomMode,
    }}>
      {children}
    </UserContext.Provider>
  );
}
