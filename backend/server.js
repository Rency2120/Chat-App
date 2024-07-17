import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from '../backend/routes/auth.js'
import messages from '../backend/routes/messageroutes.js'
import connectToMongoDB from './db/connectToMongodb.js';
import userRoutes from '../backend/routes/userRoutes.js';
import { app, server } from "./socket/Socket.js";

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());


// Create __dirname equivalenet in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const PORT = process.env.PORT || 3005;

app.use('/api/auth', authRoutes);
app.use('/api/messages',messages);
app.use('/api/users', userRoutes);


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on PORT ${PORT}`);
});
