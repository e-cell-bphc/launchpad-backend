const express = require("express");
const mongoose = require("mongoose");
const app = express();

// import routes
const authRoutes = require("./routes/auth");

// route middlewares
app.use("/api/user", authRoutes);

// connect to db
mongoose.connect(
  "mongodb+srv://xxxx:xxxx>@cluster0-o1hky.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("connected to db");
    app.listen(3000, () => console.log("server is running..."));
  }
);
