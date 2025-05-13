const express = require('express');
const axios = require('axios');
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

app.get('/call-api', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(200).json({  message: `Chamada sem target.` });
  }

  try {
    const response = await axios.get(targetUrl);
    res.json({
      message: `Chamada a ${targetUrl} realizada com sucesso`,
      data: response.data,
    });
  } catch (error) {
    console.error(`Erro ao chamar serviço externo ${targetUrl}:`, error.message);
    res.status(500).json({ error: `Erro ao chamar serviço externo ${targetUrl}` });
  }
});

app.get('/', (req, res) => {
  res.send(`Get ${NAME} service`);
});

app.listen(PORT, () => {
  console.log(`Profile service running on port ${PORT}`);
});
