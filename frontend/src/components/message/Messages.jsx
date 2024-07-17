// import { useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import Message from "./Message";


// const Messages = () => {
// 	const { messages, loading } = useGetMessages();

// 	const lastMessageRef = useRef();

// 	useEffect(() => {
// 		setTimeout(() => {
// 			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
// 		}, 100);
// 	}, [messages]);

// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			{!loading &&
// 				messages.length > 0 &&
// 				messages.map((message) => (
// 					<div key={message._id} ref={lastMessageRef}>
// 						<Message message={message} />
// 					</div>
// 				))}

// 			{!loading && messages.length === 0 && (
// 				<p className='text-center'>Send a message to start the conversation</p>
// 			)}
// 		</div>
// 	);
// };
// export default Messages;

import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages"; 
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
const { messages, loading } = useGetMessages(); // Use the custom hook
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, loading]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && <p>Loading messages...</p>}
      {messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
      {messages.length === 0 && !loading && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
