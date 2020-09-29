import { Schema, Document } from "mongoose"

interface IRatingQuestion extends IQuestion {
  min: Number
  max: Number
}

const RatingQuestionSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  {
    _id: false,
  }
)

RatingQuestionSchema.pre<IRatingQuestion>("validate", function (next) {
  if (this.min > this.max) {
    next(new Error("Answer must be between min and max"))
  } else {
    next()
  }
})

interface IAnswer extends Document {
  text: String
}

const AnswerSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  { _id: false }
)

interface IMultiQuestion extends IQuestion {
  answers: IAnswer[]
}

const MultiQuestionSchema = new Schema(
  {
    answers: [AnswerSchema],
  },
  {
    _id: false,
  }
)

interface IExclusiveQuestion extends IQuestion {
  answers: IAnswer[]
}

const ExclusiveQuestionSchema = new Schema(
  {
    answers: [AnswerSchema],
  },
  {
    _id: false,
  }
)

interface IBinaryQuestion extends IQuestion {
  answer: Boolean
}

const BinaryQuestionSchema = new Schema(
  {
    answer: { type: Boolean, required: true },
  },
  {
    _id: false,
  }
)

interface IQuestion extends Document {
  question: String
  kind: ["Binary", "Exclusive", "Multi", "Rating"]
}

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
  },
  {
    _id: false,
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
