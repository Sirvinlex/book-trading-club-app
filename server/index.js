import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import xss from 'xss-clean';
import auth from './routes/auth.js';
import users from './routes/users.js';
import book from './routes/book.js';
import request from './routes/request.js'
import trades from './routes/trades.js'


// const auth = require('./routes/auth')

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(xss());

// app.use(express.urlencoded({ extended: false }))
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
// app.use(express.json());

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/book', book);
app.use('/api/v1/request', request);
app.use('/api/v1/trades', trades);

// const CONNECTION_URL = 'mongodb+srv://sirvinlex:29933.Alex29933.Vin@cluster0.hzrll.mongodb.net/book-trading-club?retryWrites=true&w=majority'
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));