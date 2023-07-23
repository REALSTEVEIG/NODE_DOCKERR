require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const redisClient = require("./config/redis")
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
const protect = require('./middleware/auth');

console.log("mongo uri: ", process.env.MONGO_URI)
console.log("redis host: ", process.env.REDIS_HOST)
console.log("redis port: ", process.env.REDIS_PORT)
console.log("redis password: ", process.env.REDIS_PASSWORD)
console.log("node env: ", process.env.NODE_ENV)

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.enable('trust proxy');

// Initialize sesssion storage.
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  name: 'express-session',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60000, // 1 minute
    // You can also set other cookie options if needed.
  },
  resave: false, // Set this to false to prevent session being saved on every request.
  saveUninitialized: true, // Set this to true to save new sessions that are not modified.
}));

app.use('/api/v1', userRouter);
app.use('/api/v1', protect, postRouter);

const start = async () => {
  try {
    await redisClient.connect()
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
