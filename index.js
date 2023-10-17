const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = precess.env.PORT || 5000;

// middleware for server 
app.use(express.json());
app.use(cors());



