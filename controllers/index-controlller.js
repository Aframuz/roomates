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
   let roommates = await rdb.getAllData()
   const gastos = await gdb.getAllData()

   // Calculate debts
   if (roommates.length === 0) {
      console.log(`There are no roommates in the database`)
   } else {
      const totalAmount = await gdb.getTotalAmount()
      const split = totalAmount / rdb.numberOfRoommates()
      roommates = roommates.map((roommate) => {
         let debt
         let receive
         if (roommate.expenses.length === 0) {
            debt = split
            receive = 0
         } else {
            const expenses = roommate["expenses"]
               .map((expense) => {
                  const expenseAmount = gastos.find(
                     (gasto) => gasto._id === expense
                  ).amount
                  return expenseAmount
               })
               .reduce((acc, expense) => acc + +expense, 0)

            receive = expenses / rdb.numberOfRoommates()
            debt = split - receive
         }

         return {
            _id: roommate._id,
            name: roommate.name,
            lastname: roommate.lastname,
            debt: +debt,
            receive: +receive,
         }
      })
   }

   res.render("index", { roommates, gastos })
}

module.exports = {
   renderIndex,
}
