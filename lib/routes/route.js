"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Question = _interopRequireDefault(require("../controllers/Question.Contoller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setupRoutes = app => {
  // get all quiz questions
  app.get("/questions", _Question.default.ShowAll); // get random five quiz questions

  app.get("/random-questions", _Question.default.ShowFive); // get one quiz question

  app.get("/questions/:id", _Question.default.ShowOne); // create one quiz question

  app.post("/questions", _Question.default.AddOne); // update one quiz question

  app.put("/questions/:id", _Question.default.Update); // delete one quiz question

  app.delete("/questions/:id", _Question.default.Remove); // show one quiz question

  app.get("/ansower/:id", _Question.default.Show);
  app.post("/ansowers", _Question.default.GetAnsower); // this one is just a test

  app.get("/", (req, res) => {
    res.send("H3ll0 W0RlD");
  }); // Get Not Found Page

  app.get("*", (req, res) => res.send("Not Found!"));
};

var _default = setupRoutes;
exports.default = _default;