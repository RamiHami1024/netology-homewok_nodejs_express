const express = require('express')
const api = require('./routes/api')

const app = express();

app
    .use('/api/', api)
    .use(express.json())
    .listen(3000)