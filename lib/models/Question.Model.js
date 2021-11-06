"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const QuestionSchema = new _mongoose.Schema({
  title: String,
  choices: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false
    }
  }]
});
const QuestionModel = (0, _mongoose.model)("Question", QuestionSchema);
var _default = QuestionModel;
exports.default = _default;