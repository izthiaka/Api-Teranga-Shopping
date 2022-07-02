const express = require("express")
const app = express()


// Controllers for Routes
const ROLE_HANDLER = require("../core/roles/roles.routehandler").router


// URL
// app.use(express.json())
app.get("/", (req, res) => {
    res.json({ message: "Welcome to assuraf cloud application." })
})
app.use("/api/v1/roles", ROLE_HANDLER)


module.exports = app