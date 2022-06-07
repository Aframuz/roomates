/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
const { gdb } = require("../models/gastos-model")
const { rdb } = require("../models/roommates-model")
// Core Modules
const fs = require("fs-extra")

/*=============================================
=                  HANDLERS                   =
=============================================*/
// GET
const getGastos = async (req, res) => {
   // Get gastos from database
   const gastos = await gdb.getAllData()
   // Redirect to index
   res.redirect("/", { gastos })
}

// POST
const addGasto = async (req, res) => {
   // Get data from request
   const gastos = req.body
   // get roommate from database by ID
   const roommate = await rdb.getRoommateById(gastos.roommate)
   console.log(`Roommate: ${roommate.name}`)
}

// PUT
const updateGasto = async (req, res) => {}

// DELETE
const deleteGasto = async (req, res) => {}

module.exports = {
   getGastos,
   addGasto,
   updateGasto,
   deleteGasto,
}
