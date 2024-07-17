import React from 'react';
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {
	const {authUser}=useAuthContext();
	const {selectedConversation}= useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilepic = fromMe ? authUser.profilepic : selectedConversation?.profilepic;
	const bubbleBgColor = fromMe? "bg-blue-500": "bg-grey-500";
	const formattedTime = extractTime(message.createdAt);
	
  return (
    <div>
      <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilepic} />
				</div>
			</div>
			<div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>{message.message}</div>
			<div className='chat-footer  text-xs flex gap-1 items-center' style={{color:'white'}}>{formattedTime}</div>
		</div>
    </div>
  )
}

export default Message
