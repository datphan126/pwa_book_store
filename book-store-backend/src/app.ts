import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';

import addBookController from './controllers/add-book';
import addBirthdayCard from './controllers/add-birthday-card';
import fetchBooks from './controllers/fetch-books';
import fetchBirthdayCards from './controllers/fetch-birthday-cards';
import fetchBook from './controllers/fetch-book';
import updateBookController from './controllers/update-book';
import deleteBookController from './controllers/delete-book';
import fetchBirthdayCard from './controllers/fetch-birthday-card';
import updateBirthdayCardController from './controllers/update-birthday-card';
import deleteBirthdayCardController from './controllers/delete-birthday-card';

dotenv.config();

// Initialize MongoDB
mongoose.connect(process.env.DB_URI as string, { useNewUrlParser: true });
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Set the Access-Control-Allow-Origin
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Book Routes
app.post('/books', addBookController);

app.get('/books', fetchBooks);

app.get('/books/:id', fetchBook);

app.put('/books', updateBookController);

app.delete('/books/:id', deleteBookController);

// Birthday Card Routes
app.post('/birthdayCards', addBirthdayCard);

app.get('/birthdayCards', fetchBirthdayCards);

app.get('/birthdayCards/:id', fetchBirthdayCard);

app.put('/birthdayCards', updateBirthdayCardController);

app.delete('/birthdayCards/:id', deleteBirthdayCardController);

app.listen(process.env.BACKEND_PORT, () => console.log(`The server is running at http://${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}`));
