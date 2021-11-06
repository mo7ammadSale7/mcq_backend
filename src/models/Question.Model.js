import { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  title: String,
  choices: [
    {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const QuestionModel = model("Question", QuestionSchema);

export default QuestionModel;
