import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";

const useGetMessages = () => {
  const { selectedConversation, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://chat-app-h623.onrender.com/api/messages/${selectedConversation._id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(selectedConversation._id, data);
      } catch (error) {
        console.error("Error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation, setMessages]);

  return {
    messages: useConversation(
      (state) => state.messages[selectedConversation?._id] || []
    ),
    loading,
  };
};

export default useGetMessages;
