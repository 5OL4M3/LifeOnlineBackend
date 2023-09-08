const express = require("express");
const todoListRouter = require("./routes/todolist");
const authenticationRouter = require("./routes/authentication");
const gradebookRouter = require("./routes/gradebook");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/todolist", todoListRouter);
app.use("/authentication", authenticationRouter);
app.use("/gradebook", gradebookRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
