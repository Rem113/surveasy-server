import { Schema, Document } from "mongoose"

interface IRatingQuestion extends IQuestion {
  min: Number
  max: Number
}

const RatingQuestionSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
})

RatingQuestionSchema.pre<IRatingQuestion>("validate", function (next) {
  if (this.min > this.max) {
    next(new Error("Answer must be between min and max"))
  } else {
    next()
  }
})

interface IAnswer extends Document {
  answer: String
}

const AnswerSchema = new Schema({
  answer: { type: String, required: true },
})

interface IMultiQuestion extends IQuestion {
  answers: IAnswer[]
}

const MultiQuestionSchema = new Schema({
  answers: [AnswerSchema],
})

interface IExclusiveQuestion extends IQuestion {
  answers: IAnswer[]
}

const ExclusiveQuestionSchema = new Schema({
  answers: [AnswerSchema],
})

interface IBinaryQuestion extends IQuestion {
  answer: Boolean
}

const BinaryQuestionSchema = new Schema({})

interface IQuestion extends Document {
  question: String
  kind: ["Binary", "Exclusive", "Multi", "Rating"]
}

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
  },
  {
    discriminatorKey: "kind",
  }
)

export {
  QuestionSchema,
  BinaryQuestionSchema,
  ExclusiveQuestionSchema,
  MultiQuestionSchema,
  RatingQuestionSchema,
  AnswerSchema,
  IQuestion,
  IBinaryQuestion,
  IExclusiveQuestion,
  IMultiQuestion,
  IRatingQuestion,
  IAnswer,
}
