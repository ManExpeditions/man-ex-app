import http from 'http';
import App from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to MongoDB
import mongoose from './lib/mongoose';
mongoose();

const server = http.createServer(App);
server.listen(port);
