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
}

const rdb = new RoommateDB("roommates")

module.exports = { rdb }
