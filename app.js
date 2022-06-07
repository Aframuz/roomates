/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party Modules
const express = require("express")
const dotenv = require("dotenv").config()
// Local Modules
const indexRoute = require("./routes/index-route")
const roommateRoute = require("./routes/roommate-route")
const gastoRoute = require("./routes/gasto-route")
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
// Set JQuery path
app.use(
   "/jquery",
   express.static(path.join(__dirname, "node_modules/jquery/dist"))
)
// Set Font-Awesome path
app.use(
   "/fa",
   express.static(
      path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")
   )
)
// Set Popper path
app.use(
   "/popper",
   express.static(path.join(__dirname, "node_modules/@popperjs/core/dist/umd"))
)
// Set static files path
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "pug")

/*=============================================
=                   ROUTES                    =
=============================================*/
app.use("/", indexRoute)

app.use("/roommates", roommateRoute)
app.use("/gastos", gastoRoute)

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})
