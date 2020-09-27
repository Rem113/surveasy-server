import { connect } from "mongoose"

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Surveasy"

export default () => {
  connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => console.log("Connected to MongoDB!"))
}
