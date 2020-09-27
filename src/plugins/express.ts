import express from "express"

import bodyParser from "body-parser"
import cors from "cors"

import authRoutes from "../routes/auth"
import surveyRoutes from "../routes/survey"

export default (app: express.Application) => {
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use("/v1/auth", authRoutes)
  app.use("/v1/survey", surveyRoutes)
}
