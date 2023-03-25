const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

const PORT = process.env.PORT || 5000;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API ROUTES
const authRoutes = require("./routes/api/auth");
const slotDateRoutes = require("./routes/api/slotDate");
const postRoutes = require("./routes/api/post");

app.use("/api/auth", authRoutes);
app.use("/api/slotDates", slotDateRoutes);
app.use("/api/posts", postRoutes);

// CONNECT TO DB
// mongoose.connect(
//   process.env.DB_CONNECTION,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   },
//   () => {
//     console.log("Connected to DB!");

//     // START SERVER
//     app.listen(PORT, () => {
//       console.log("Server now listening on port 5000");
//     });
//   }
// );

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// SERVE STATIC ASSETS IF IN PRODUCTION
app.use(express.static("client/build"));

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
