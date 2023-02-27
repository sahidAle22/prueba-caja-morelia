import express from 'express'
import cors from 'cors'
import clientesRoutes from './routes/clientes.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(clientesRoutes)

app.listen(4000)
console.log("Server is runing en el puerto 4000")