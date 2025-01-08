import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import locationRoutes from './api/routes/locationRoutes.js';
import checklistRoutes from './api/routes/checklistRoutes.js';
import authRoutes from './api/routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api', locationRoutes);
app.use('/api', checklistRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
