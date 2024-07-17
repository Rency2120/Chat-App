import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/ChatAppDatabase");
// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB');
//   });
  
//   mongoose.connection.on('error', (err) => {
//     console.log('Error connecting to MongoDB:', err);
//   });

const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
    
};

export default connectToMongoDB;