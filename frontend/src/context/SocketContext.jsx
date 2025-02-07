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
        const socket = io(process.env.BACKEND_URL, {
          transports: ["websocket", "polling"],
          query: {
            userId: authUser._id,
          },
        });

        socket.on("connect", () => {
          console.log("connected to server", socket.id);
        });

        setSocket(socket);

        // socket.on is used to listen the events and can be used on both client and server side
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        socket.on("connect_error", (error) => {
          console.error("Connection error:", error);
        });

        socket.on("disconnect", () => {
          console.log("disconnected from server", socket.id);
        });

        socket.on("onlineUsers", (users) => {
          setOnlineUsers(users);
        });

        return () => {
          console.log("closing socket", socket.id);
          socket.close();
        };
      } catch (error) {
        console.error("Error connecting to Socket.IO server:", error);
      }
    } else {
      if (socket) {
        console.log("closing socket", socket.id);
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
