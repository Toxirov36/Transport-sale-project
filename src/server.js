import express from 'express';
import { connectDB } from './db/config.js';
import errorHandler from './middlewares/errorHandler.js';
import branchRoutes from './routes/branches.Routes.js';
import stuffRoutes from './routes/stuff.Routes.js';
import transportRoutes from './routes/transport.Routes.js';
import authRoutes from './routes/auth.routes.js';
const app = express();
app.use(express.json());

connectDB();

app.use(branchRoutes);
app.use(stuffRoutes);
app.use(transportRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(5000, () => console.log("Server is running..."));