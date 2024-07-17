// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			setLoading(true);
// 			try {
// 				const res = await fetch(`http:/localhost:3005/api/messages/${selectedConversation._id}`);
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
// 				setMessages(data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (selectedConversation?._id) getMessages();
// 	}, [selectedConversation?._id, setMessages]);

// 	return { messages, loading };
// };
// export default useGetMessages;

import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation.js';

const useGetMessages = () => {
  const { selectedConversation, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3005/api/messages/${selectedConversation._id}`,{
          credentials:"include"
        });
        console.log("response", response);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
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

  return { messages: useConversation(state => state.messages[selectedConversation?._id] || []), loading };
};

export default useGetMessages;
