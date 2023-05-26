const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoute.js");
const blogPostRoutes = require("./routes/blogPostRoutes.js");
dotenv.config();

// express app
const app = express();

// connect to the database
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB database");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB database:", err.message);
      process.exit(1); // Exit the process with a non-zero status code to indicate failure
    });
};
app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/blogPost", blogPostRoutes);
// app.use("/api/tweets", tweetRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening on port 8000");
});
