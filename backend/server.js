const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

const places = require("./routes/places");
const tasks = require("./routes/tasks");

dotenv.config();

connectDB();

const app = express();

const router = express.Router();

app.use(express.json());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/places", places);
app.use("api/v1/tasks", tasks);

app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
