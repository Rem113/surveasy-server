import { Router } from "express"
import Survey from "../models/Survey"

const router = Router()

router.post("/", async (req, res) => {
  const { questions, until } = req.body
  const postedBy = "Moi même"

  if (
    questions === undefined ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res.status(400).end("Please specify at least one question")
  }

  const survey = new Survey({
    postedBy,
    questions,
  })

  try {
    await survey.validate()
  } catch (err) {
    return res.status(400).end("Invalid question format")
  }

  return res.status(201).json(await survey.save())
})

export default router
