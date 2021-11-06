import QuestionModel from "../models/Question.Model";
var ObjectID = require("mongodb").ObjectID;

const Question = {
  ShowAll: async (req, res) => {
    const questions = await QuestionModel.find({});
    res.statusCode = 200;
    res.send(questions);
  },

  ShowFive: async (req, res) => {
    const questions = await QuestionModel.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          title: 1,
          choices: { _id: 1, text: 1 },
        },
      },
    ]);
    res.statusCode = 200;
    res.send(questions);
  },

  AddOne: async (req, res) => {
    const { title, choices } = req.body;
    try {
      const newQuestion = new QuestionModel({
        title,
        choices,
      });
      await newQuestion.save();
      res.statusCode = 201;
      res.json({ message: `${newQuestion.title} has success Added!` });
    } catch (error) {
      res.statusCode = 400;
      res.send(error.message);
    }
  },

  ShowOne: async (req, res) => {
    const id = req.params.id;
    const question = await QuestionModel.findById(id);
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
    const ansower = await QuestionModel.findOne(
      { "choices._id": id },
      { "choices.$": 1 }
    );
    let v = 0;
    if (ansower.choices[0].isCorrect) {
      v = 1;
    }
    res.statusCode = 200;
    res.json(ansower);
  },

  GetAnsower: async (req, res) => {
    const { choices, name } = req.body;
    let score = 0;
    let ansowers = await QuestionModel.find(
      {
        "choices._id": { $in: choices },
      },
      { "choices.$": 1 }
    );

    ansowers.map((element) => {
      if (element.choices[0].isCorrect) {
        score++;
      }
    });

    res.statusCode = 200;
    res.json(`Your name is ${name} and your score is ${score}`);
  },

  Update: async (req, res) => {
    const id = req.params.id;
    const { title, choices } = req.body;
    const questionInfo = {
      title,
      choices,
    };
    const question = await QuestionModel.findByIdAndUpdate(id, {
      $set: questionInfo,
    });
    res.statusCode = 201;
    res.json({ message: `${question.title} has success Updated!` });
  },

  Remove: async (req, res) => {
    const id = req.params.id;
    const question = await QuestionModel.findByIdAndRemove(id);
    res.statusCode = 204;
    res.json({ message: `${question.title} has success Deleted!` });
  },
};

export default Question;
