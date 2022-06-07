/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
const { gdb } = require("../models/gastos-model")
const { rdb } = require("../models/roommates-model")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderIndex = async (req, res) => {
   //  Get roommates, gastos from databases
   const roommates = await rdb.getAllData()
   const gastos = await gdb.getAllData()
   res.render("index", { roommates, gastos })
}

module.exports = {
   renderIndex,
}
