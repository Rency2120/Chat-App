import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationsound from "../assets/sound/notification.mp3";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { addMessage, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationsound);
      sound.play();

      if (
        selectedConversation?._id === newMessage.senderId ||
        selectedConversation?._id === newMessage.receiverId
      ) {
        addMessage(selectedConversation._id, newMessage);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation, addMessage]);
};

export default useListenMessages;
