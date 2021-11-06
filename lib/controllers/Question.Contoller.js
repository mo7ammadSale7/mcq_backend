"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Question = _interopRequireDefault(require("../models/Question.Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectID = require("mongodb").ObjectID;

const Question = {
  ShowAll: async (req, res) => {
    const questions = await _Question.default.find({});
    res.statusCode = 200;
    res.send(questions);
  },
  ShowFive: async (req, res) => {
    const questions = await _Question.default.aggregate([{
      $sample: {
        size: 5
      }
    }, {
      $project: {
        title: 1,
        choices: {
          _id: 1,
          text: 1
        }
      }
    }]);
    res.statusCode = 200;
    res.send(questions);
  },
  AddOne: async (req, res) => {
    const {
      title,
      choices
    } = req.body;

    try {
      const newQuestion = new _Question.default({
        title,
        choices
      });
      await newQuestion.save();
      res.statusCode = 201;
      res.json({
        message: "".concat(newQuestion.title, " has success Added!")
      });
    } catch (error) {
      res.statusCode = 400;
      res.send(error.message);
    }
  },
  ShowOne: async (req, res) => {
    const id = req.params.id;
    const question = await _Question.default.findById(id);

    if (!question) {
      res.statusCode = 404;
      res.json({});
    } else {
      res.statusCode = 200;
      res.send(question);
    }
  },
  Show: async (req, res) => {
    const id = req.params.id;
    const ansower = await _Question.default.findOne({
      "choices._id": id
    }, {
      "choices.$": 1
    });
    let v = 0;

    if (ansower.choices[0].isCorrect) {
      v = 1;
    }

    res.statusCode = 200;
    res.json(ansower);
  },
  GetAnsower: async (req, res) => {
    const {
      choices,
      name
    } = req.body;
    let score = 0;
    let ansowers = await _Question.default.find({
      "choices._id": {
        $in: choices
      }
    }, {
      "choices.$": 1
    });
    ansowers.map(element => {
      if (element.choices[0].isCorrect) {
        score++;
      }
    });
    res.statusCode = 200;
    res.json("Your name is ".concat(name, " and your score is ").concat(score));
  },
  Update: async (req, res) => {
    const id = req.params.id;
    const {
      title,
      choices
    } = req.body;
    const questionInfo = {
      title,
      choices
    };
    const question = await _Question.default.findByIdAndUpdate(id, {
      $set: questionInfo
    });
    res.statusCode = 201;
    res.json({
      message: "".concat(question.title, " has success Updated!")
    });
  },
  Remove: async (req, res) => {
    const id = req.params.id;
    const question = await _Question.default.findByIdAndRemove(id);
    res.statusCode = 204;
    res.json({
      message: "".concat(question.title, " has success Deleted!")
    });
  }
};
var _default = Question;
exports.default = _default;