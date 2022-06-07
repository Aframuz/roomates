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
   // Get Roomate by ID
   async getRoommateById(id) {
      try {
         // Read the DB and parse it to obj
         const data = await fs.readJson(this.getPath())
         // Filter the data array by id and return the 1st item
         const dataFound = data[this.getName()].find((item) => item.id === id)
         return dataFound
      } catch (err) {
         console.error(`There was an error getting data:\n${err.message}`)
      }
   }
}

const rdb = new RoommateDB("roommates")

module.exports = { rdb }
