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
      let gastos = []
      try {
         // Get all gastos
         gastos = await this.getAllData()
      } catch (err) {
         // Log error
         console.log(err)
      } finally {
         // Return total amount
         return !gastos.length
            ? gastos.reduce((acc, gasto) => acc + +gasto.amount, 0)
            : 0
      }
   }
}

// Initialize DB
const gdb = new GastoDB("gastos")

module.exports = { gdb }
