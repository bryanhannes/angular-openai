import * as cors from 'cors';
import * as express from 'express';
import * as chat from './app/chat';
import * as image from './app/image';
import * as moderation from './app/moderation';

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to api!' });
// });

app.use('/api', chat.router);
app.use('/api', image.router);
app.use('/api', moderation.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});
// no stacktraces leaked to user

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
