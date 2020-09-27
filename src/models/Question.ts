import { Schema, Document } from "mongoose"

interface IRatingQuestion extends IQuestion {
  answer: Number
  min: Number
  max: Number
}

const RatingQuestionSchema = new Schema(
  {
    answer: { type: Number, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  {
    _id: false,
  }
)

RatingQuestionSchema.pre<IRatingQuestion>("validate", function (next) {
  if (this.answer > this.max || this.answer < this.min) {
    next(new Error("Answer must be between min and max"))
  } else {
    next()
  }
})

interface IAnswer extends Document {
  text: String
  selected: Boolean
}

const AnswerSchema = new Schema(
  {
    text: { type: String, required: true },
    selected: { type: Boolean, default: false },
  },
  { _id: false }
)

interface IMultiQuestion extends IQuestion {
  answers: IAnswer[]
}

const MultiQuestionSchema = new Schema(
  {
    answers: {
      type: [AnswerSchema],
      validate: {
        validator: (answers: IAnswer[]) =>
          answers.filter((answer) => answer.selected).length > 0,
        message: "You have to select at least one answer",
      },
    },
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
    answers: {
      type: [AnswerSchema],
      validate: {
        validator: (answers: IAnswer[]) =>
          answers.filter((answer) => answer.selected).length === 1,
        message: "You have to select exactly one answer",
      },
    },
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
