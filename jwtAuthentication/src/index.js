import express from 'express';
import dotenv from 'dotenv';
import router from './router/authRoutes.router.js';
import { connectDB } from './helpers/connections.js';
import user from './models/user.model.js';
import cookieParser from "cookie-parser";
dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//parse application/x-www-form-urlencoded which means it can parse form data
app.use(cookieParser())
app.use('/api/auth', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});