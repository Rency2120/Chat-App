import User from "../model/usermodel.js";

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        
        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log('Error in getUsersForSidebar', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUserProfile = async (req,res)=>{
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("-password");

        res.status(200).json({success:true, message:'User Retreived Successfully', user})
    } catch (error) {
        console.log('Error in getUserProfile', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}