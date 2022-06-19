/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local Modules
const { Model } = require("./model")
// Core Modules
const fs = require("fs-extra")

/*=============================================
=                  VARIABLES                  =
=============================================*/
class RoommateDB extends Model {
   constructor(name) {
      super(name)
   }

   /*=====  METHODS  ======*/
   numberOfRoommates() {
      return this.getLength()
   }

   async addGastoToRoommate(idRommate, idGasto) {
      const roommate = await this.getDataById(idRommate)
      roommate["expenses"].push(idGasto)
      await this.updateDataById(idRommate, roommate)
   }

   async deleteGastoReference(idGasto) {
      // Get all roommates
      const roommates = await this.getAllData()
      // Find roomate with idGasto in expenses
      const roommateToUpdate = roommates.find((roommate) =>
         roommate.expenses.includes(idGasto)
      )
      // Remove idGasto from expenses
      roommateToUpdate.expenses.splice(
         roommateToUpdate.expenses.indexOf(idGasto),
         1
      )
      // Update roommates DB
      await this.updateDataById(roommateToUpdate._id, roommateToUpdate)
   }
}

const rdb = new RoommateDB("roommates")

module.exports = { rdb }
