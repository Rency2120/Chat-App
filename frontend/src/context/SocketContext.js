import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      try {
        const socketInstance = io("https://chat-app-h623.onrender.com", {
          transports: ["websocket", "polling"],
          query: { userId: authUser._id },
        });

        socketInstance.on("connect", () => {
          console.log("Connected to server", socketInstance.id);
        });

        setSocket(socketInstance);

        socketInstance.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        socketInstance.on("connect_error", (error) => {
          console.error("Connection error:", error);
        });

        socketInstance.on("disconnect", () => {
          console.log("Disconnected from server", socketInstance.id);
        });

        return () => {
          console.log("Closing socket", socketInstance.id);
          socketInstance.close();
        };
      } catch (error) {
        console.error("Error connecting to Socket.IO server:", error);
      }
    } else {
      if (socket) {
        console.log("Closing socket", socket.id);
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
