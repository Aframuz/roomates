/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
const { rdb } = require("../models/roommates-model")

/*=============================================
=                  HANDLERS                   =
=============================================*/
// GET
const getRoommates = async (req, res) => {
   try {
      // Get all roommates from DB
      const roommates = await rdb.getAllData()
      // Show roommates in JSON format
      res.status(200).json({ roommates })
   } catch (err) {
      // Show error in JSON format
      res.status(500).json({ message: err.message })
   }
}

// POST
const addRoommate = async (req, res) => {
   try {
      // Get user to insert
      const roomate = res.locals.user
      // Insert roommate into DB
      await rdb.addData(roomate)
      // Render index
      res.status(200).redirect("/")
   } catch (err) {
      // Show error in JSON format
      res.status(500).json({ message: err.message })
   }
}

module.exports = {
   getRoommates,
   addRoommate,
}
