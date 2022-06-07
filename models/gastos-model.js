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
}

const gdb = new GastoDB("gastos")

module.exports = { gdb }
