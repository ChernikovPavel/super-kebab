require('dotenv').config();
const removeHeaders = require('../middlewares/removeHeaders');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('./routers/api.router')
const path = require('path');

const { PORT } = process.env;
const corsConfig = {
  origin: [ 
    'http://localhost:5173',
    'http://127.0.0.1.5173'
  ],
  credentials: true
}
const app = express();
app.use(removeHeaders)
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});