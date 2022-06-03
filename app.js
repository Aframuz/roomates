/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party Modules
const express = require("express")
const dotenv = require("dotenv").config()
// Local Modules
const roommateRoute = require("./routes/roomate")
const gastoRoute = require("./routes/gasto")
// Core Modules
const path = require("path")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const PORT = process.env.PORT || 3000
const app = express()

/*=============================================
=                 MIDDLEWARE                  =
=============================================*/
// Set Bootstrap path
app.use(
   "/bootstrap",
   express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
)
// Set Font-Awesome path
app.use(
   "/fa",
   express.static(
      path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")
   )
)
// Set JQuery path
app.use(
   "/jquery",
   express.static(path.join(__dirname, "node_modules/jquery/dist"))
)
// Set Popper path
app.use(
   "/popper",
   express.static(path.join(__dirname, "node_modules/@popperjs/core/dist/umd"))
)
// Set static files path
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "pug")

/*=============================================
=                   ROUTES                    =
=============================================*/
app.get("/", (req, res) => {
   res.render("index")
})

app.use("/roommate", roommateRoute)

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})
