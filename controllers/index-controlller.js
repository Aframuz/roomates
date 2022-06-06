/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
// IMPORT MODELS HERE
// Core Modules
const fs = require("fs-extra")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderIndex = (req, res) => {
   const { gastos } = fs.readJSONSync("./db/gastos.json")
   const { roommates } = fs.readJSONSync("./db/roommates.json")
   res.render("index", { gastos, roommates })
}

module.exports = {
   renderIndex,
}
