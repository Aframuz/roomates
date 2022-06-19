/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local Modules
const { Model } = require("./model")

/*=============================================
=                 DB INSTANCE                 =
=============================================*/
class RoommateDB extends Model {
   constructor(name) {
      super(name)
   }

   /*=====  METHODS  ======*/
   // Get number of roommates in DB
   numberOfRoommates() {
      return this.getLength()
   }

   // Get all emails from roommates
   async getAllEmails() {
      try {
         // Get all roommates
         const roommates = await this.getAllData()
         // Get all emails from roommates
         const emails = roommates.map((roommate) => roommate.email)
         // Return emails
         return emails
      } catch (err) {
         // Log error
         console.log(err)
      }
   }

   // Add expense id to expenses array in specific roommate
   async addGastoToRoommate(idRommate, idGasto) {
      try {
         // Get roommmate by ID
         const roommate = await this.getDataById(idRommate)
         // Add expense id to expenses array
         roommate["expenses"].push(idGasto)
         // Update roommate DB
         await this.updateDataById(idRommate, roommate)
      } catch (err) {
         // Log error
         console.log(err)
      }
   }

   async deleteGastoReference(idGasto) {
      try {
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
      } catch (err) {
         // Log error
         console.log(err)
      }
   }
}

// Initialize DB
const rdb = new RoommateDB("roommates")

module.exports = { rdb }
