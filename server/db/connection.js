const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
// mongoose.set("debug", true);
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database connect failed!", err));
