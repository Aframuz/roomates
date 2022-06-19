/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local Modules
const { Model } = require("./model")

/*=============================================
=                  VARIABLES                  =
=============================================*/
class GastoDB extends Model {
   constructor(name) {
      super(name)
   }

   async getTotalAmount() {
      const gastos = await this.getAllData()
      return gastos ? gastos.reduce((acc, gasto) => acc + +gasto.amount, 0) : 0
   }
}

const gdb = new GastoDB("gastos")

module.exports = { gdb }
