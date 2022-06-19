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
const getRoommates = async (req, res) => {
   // render view
   const roommates = await rdb.getAllData()
   res.json({ roommates })
}

module.exports = {
   getRoommates,
   addRoommate,
}
