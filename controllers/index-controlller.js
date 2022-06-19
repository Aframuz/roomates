/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
const { gdb } = require("../models/gastos-model")
const { rdb } = require("../models/roommates-model")
const calculateDebt = require("../middleware/calculate-debt")

/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderIndex = async (req, res) => {
   try {
      //  Get roommates, gastos from databases
      const roommatesRaw = await rdb.getAllData()
      const gastos = await gdb.getAllData()

      // Get total amount, number of roommates
      const totalAmount = await gdb.getTotalAmount()
      const numOfRoommates = rdb.numberOfRoommates()

      // Calculate debt
      const options = {
         roommatesRaw,
         gastos,
         totalAmount,
         numOfRoommates,
      }
      const roommates = calculateDebt(options)

      // Render index page
      res.status(200).render("index", { roommates, gastos })
   } catch (err) {
      // Render error page
      console.log(err)
      res.status(500).send("Internal Server Error")
   }
}

module.exports = {
   renderIndex,
}
