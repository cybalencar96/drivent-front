import { useState, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TicketInfoContext = createContext();
export default TicketInfoContext;

export function TicketInfoProvider({ children }) {
  const [ticketInfo, setTicketInfo] = useLocalStorage("ticketInfo", {});
  
  return (
    <TicketInfoContext.Provider value={{ ticketInfo, setTicketInfo }}>
      {children}
    </TicketInfoContext.Provider>
  );
}
