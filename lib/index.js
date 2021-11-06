"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _route = _interopRequireDefault(require("./routes/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const start = async () => {
  try {
    // Connect to DB
    await _mongoose.default.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB, Let's Create an app!");
    const app = (0, _express.default)();
    app.use((0, _cors.default)());
    app.use(_bodyParser.default.urlencoded({
      extended: true
    }));
    app.use(_bodyParser.default.json());
    console.log("App is created, Let's Setup Routes!");
    (0, _route.default)(app);
    const port = process.env.PORT || 4000;
    console.log("App Routes is added, let's listen in port ".concat(port, "!"));
    app.listen(port);
  } catch (error) {
    console.error(error);
  }
};

start();