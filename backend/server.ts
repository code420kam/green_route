import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import userRouter from './user/router'
import vehicleRouter from "./vehicle/router"
import { accessHeader } from './middleware/auth'
const app: express.Application = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json())
app.use('/register',[accessHeader], userRouter)
app.use('/login',[accessHeader], userRouter)
app.use("/vehicle",[accessHeader], vehicleRouter)

app.listen(port, () => {
    console.log(`Listen to localhost:${port}`)
})
