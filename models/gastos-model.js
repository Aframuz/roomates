/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local Modules
const { Model } = require("./model")

/*=============================================
=                 DB INSTANCE                 =
=============================================*/
class GastoDB extends Model {
   constructor(name) {
      super(name)
   }

   /*=====  METHODS  ======*/
   // Get total expenses of all roommates
   async getTotalAmount() {
      try {
         const gastos = await this.getAllData()
         const totalAmount = gastos.reduce(
            (acc, gasto) => +gasto.amount + acc,
            0
         )
         return totalAmount
      } catch (err) {
         console.error(err)
         return 0
      }
   }
}

// Initialize DB
const gdb = new GastoDB("gastos")

module.exports = { gdb }
