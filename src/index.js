require('dotenv').config()
const express = require('express')
const rotas = require('./rotas/rotas')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(rotas)

//app.listen(process.env.PORT) - não funciona por enquanto

app.listen(3000);
