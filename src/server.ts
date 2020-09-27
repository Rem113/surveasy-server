import express from "express"

import expressPlugin from "./plugins/express"
import mongoosePlugin from "./plugins/mongoose"

const port = process.env.PORT || 5000

const main = () => {
  const app = express()

  expressPlugin(app)
  mongoosePlugin()

  app.listen(port, () => console.log(`Listening on port ${port}!`))
}

main()
