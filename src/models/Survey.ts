import { Schema, model } from "mongoose"

import {
  QuestionSchema,
  BinaryQuestionSchema,
  ExclusiveQuestionSchema,
  MultiQuestionSchema,
  RatingQuestionSchema,
} from "./Question"

const SurveySchema = new Schema({
  answerCount: { type: Number, default: 0 },
  postedAt: { type: Date, default: Date.now },
  postedBy: { type: String, required: true },
  questions: [QuestionSchema],
  until: Date,
})

const QuestionArrayType = SurveySchema.path(
  "questions"
) as Schema.Types.DocumentArray

QuestionArrayType.discriminator("Binary", BinaryQuestionSchema)
QuestionArrayType.discriminator("Exclusive", ExclusiveQuestionSchema)
QuestionArrayType.discriminator("Multi", MultiQuestionSchema)
QuestionArrayType.discriminator("Rating", RatingQuestionSchema)

export default model("Survey", SurveySchema, "Surveys")
