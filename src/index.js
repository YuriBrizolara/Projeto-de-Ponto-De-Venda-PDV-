const express = require('express')
require('dotenv').config()
const rotas = require('./rotas/rotas')

const app = express()
app.use('cors')
app.use(express.json())
app.use(rotas)

app.listen(process.env.PORT)
