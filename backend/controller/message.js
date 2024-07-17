// import Conversation from "../model/conversationmodel.js";
// import Message from "../model/messagemodel.js";

// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] }
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             })
//         };

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         });
//         await newMessage.save();
      
//             conversation.messages.push(newMessage._id);
//             await conversation.save()
        

//         await Promise.all([conversation.save(), newMessage.save()]);

//         res.status(500).json(newMessage)


//     } catch (error) {
//         console.log('error :>> ', error);
//         res.status(500).json({ error: "Internal Server Error" })
//     }
// };

// export const getMessages = async (req, res) => {
//     try {
//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         const conversation = await Conversation.findOne({
//             participants: { $all: [senderId, userToChatId] }
//         }).populate("messages");

//         if (!conversation) {
//             return res.status(404).json({ error: 'No conversation found' });
//         }

//         const messages = conversation.messages;

//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error getting messages:', error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
                participants:{$all:[senderId,userToChatId]}
        }).populate("messages");
        
        if (!conversation) {
            return res.status(404).json({ error: 'No conversation found' });
        }
     const messages=conversation.messages;
     
     res.status(200).json(messages)
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

import Conversation from "../model/conversationmodel.js";
import Message from "../model/messagemodel.js";
import {getReceiverSocketId,io} from '../socket/Socket.js'

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        await newMessage.save();

        conversation.messages.push(newMessage._id);
        await conversation.save();

        res.status(200).json(newMessage);
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        
        if(receiverSocketId){
            // io.to(<socket_id>)used to send event to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

