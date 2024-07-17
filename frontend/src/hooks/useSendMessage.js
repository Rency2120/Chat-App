// import { useState } from 'react';
// import useConversation from '../zustand/useConversation';
// import { toast } from 'react-hot-toast';

// const useSendMessage = () => {
//   const [loading,setLoading]= useState(true);
//   const {messages,setMessages,selectedConversation}=useConversation();
  
//   const sendMessage = async (message)=>{
//     setLoading(true)
//     try {
//         const res = await fetch(`http://localhost:3005/api/messages/send/${selectedConversation._id}`, {
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({message}),
            
//             credentials:'include',
//         });
        
//         const data = await res.json();
//         console.log("message_data", data)
        
//         if(data.error){
//             throw new Error(data.error);
//         };
        
//         setMessages([...messages,data])
        
//     } catch (error) {
//         toast.error(error.message)
        
//     }finally{
//         setLoading(false)
//     }
//   };
  
//   return {loading, sendMessage}
// }

// export default useSendMessage

import { useCallback } from 'react';
import useConversation from '../zustand/useConversation';
import { toast } from 'react-hot-toast';

const useSendMessage = () => {
  const { selectedConversation, addMessage } = useConversation();

  const sendMessage = useCallback(async (messageText) => {
    if (!selectedConversation) {
      throw new Error('No conversation selected');
    }

    try {
      const response = await fetch(`http://localhost:3005/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageText }),
        credentials: "include"
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send message: ${errorText}`);
      }

      const message = await response.json();
      addMessage(selectedConversation._id, message);
    
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      throw error;
    }
  }, [selectedConversation, addMessage]);

  return { sendMessage };
};

export default useSendMessage;
