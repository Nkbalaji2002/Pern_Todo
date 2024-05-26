const express = require("express");
const taskRoutes = require("./Routes/tasks.router.js");
const cors = require("cors");

// create the express application
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/tasks", taskRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
