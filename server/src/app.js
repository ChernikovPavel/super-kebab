require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

// const authRouter = require('./routers/auth.router');
// const tokenRouter = require('./routers/token.router');
const apiRouter = require('./routers/api.router')

const cors = require('cors');
const removeHeaders = require('../middlewares/removeHeaders');

const corsConfig = {
  origin: [ 
    'http://localhost:5173',
    'http://127.0.0.1.5173'
  ],
  credentials: true
}
const app = express();
const { PORT } = process.env;

app.use(removeHeaders)
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/api', apiRouter)

// app.use('/api/auth', authRouter);
// app.use('/api/tokens', tokenRouter);

// app.use('*', (req, res) => {
//   res.redirect('/');
// });

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});