const express = require("express");
const app = express();

//app.use("/casesList", require("./src/config/routerCasesList"));
app.get("/casesList", (req, res) => {
    res.render("teste");
});