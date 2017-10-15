const express = require('express');
const router = express.Router();

const createTodo = require('./controllers/createTodo.js');

router.post('/', createTodo);

module.exports = router;