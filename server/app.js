const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.listen({ port: 4000 }, () => {
  console.info(`🛰 Server ready at http://localhost:4000`);
});
