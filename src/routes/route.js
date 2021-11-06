import Question from "../controllers/Question.Contoller";

const setupRoutes = (app) => {
  // get all quiz questions
  app.get("/questions", Question.ShowAll);

  // get random five quiz questions
  app.get("/random-questions", Question.ShowFive);

  // get one quiz question
  app.get("/questions/:id", Question.ShowOne);

  // create one quiz question
  app.post("/questions", Question.AddOne);

  // update one quiz question
  app.put("/questions/:id", Question.Update);

  // delete one quiz question
  app.delete("/questions/:id", Question.Remove);

  // show one quiz question
  app.get("/ansower/:id", Question.Show);

  app.post("/ansowers", Question.GetAnsower);

  // this one is just a test
  app.get("/", (req, res) => {
    res.send("H3ll0 W0RlD");
  });

  // Get Not Found Page
  app.get("*", (req, res) => res.send("Not Found!"));
};

export default setupRoutes;
