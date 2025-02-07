import { useCallback } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";

const useSendMessage = () => {
  const { selectedConversation, addMessage } = useConversation();

  const sendMessage = useCallback(
    async (messageText) => {
      if (!selectedConversation) {
        throw new Error("No conversation selected");
      }

      try {
        const response = await fetch(
          `https://chat-app-h623.onrender.com/api/messages/send/${selectedConversation._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: messageText }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to send message: ${errorText}`);
        }

        const message = await response.json();
        addMessage(selectedConversation._id, message);
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
        throw error;
      }
    },
    [selectedConversation, addMessage]
  );

  return { sendMessage };
};

export default useSendMessage;
