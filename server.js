'use strict';

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'));
app.use('/app', express.static('www'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

 
