/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
const { rdb } = require("../models/roommates-model")
// IMPORT MODELS HERE

/*=============================================
=                  HANDLERS                   =
=============================================*/
const addRoommate = async (req, res) => {
   // Get user to insert
   const roomate = res.locals.user
   // Insert roommate into DB
   await rdb.addData(roomate)
   // Render index
   res.redirect("/")
}

// GET getUsers route
const getRoommates = (req, res) => {
   // render view
   console.log(`redirected to index`)
   res.redirect("/")
}

module.exports = {
   getRoommates,
   addRoommate,
}
