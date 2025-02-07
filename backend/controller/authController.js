import User from '../model/usermodel.js';
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords doesn't match" })
        };

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" })
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `http://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `http://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    fullname,
                    username,
                    password: hashedPassword,
                    gender,
                    profilepic: gender === "male" ? boyProfilePic : girlProfilePic
                });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id,res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic
            })
        } else {
            res.status(400).json({ error: "Internal Data" });
        }

    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Internal Server error" })
    }
};

export const login = async (req,res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        
        if(!user || !isPasswordValid){
            return res.status(400).json({error:"Inavlid username and password"});
        };
        
        generateTokenAndSetCookie(user._id, res);
        
        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic
        });
        
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal Server error" })
    }
};

export const logout = async (req,res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Loggedout Successfully"});
        
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}