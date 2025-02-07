import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import { toast } from 'react-hot-toast';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();
	
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await sendMessage(message);
      setMessage('');
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='relative w-full'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!selectedConversation}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
