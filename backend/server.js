const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoutes");
const noteRoute = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/ErrorHandler");
const path = require("path");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);

//----deployment-----
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../frontend/build/index.html"));
    // res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running..");
  });
}

//-----deployment------
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, (res, err) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log(`Server started on Port ${PORT}`);
});
