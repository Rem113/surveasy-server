import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import authRoutes from "./routes/auth"

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/v1/auth", authRoutes)

app.listen(port, () => console.log(`Listening on port ${port}!`))
