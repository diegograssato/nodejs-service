const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const NAME = process.env.NAME || 'node-service';
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.send(`pong from ${NAME} service`);
});

app.get('/', (req, res) => {
  res.send(`Get ${NAME} service`);
});

app.listen(PORT, () => {
  console.log(`Profile service running on port ${PORT}`);
});
