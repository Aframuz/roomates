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
const addGasto = async (req, res, next) => {
   // Shortcircuit method
   const method = res.locals._method
   if (method !== "POST") next()
   // Get data from request
   const gastos = req.body
   // get roommate from database by ID
   const roommate = await rdb.getRoommateById(gastos.roommate)
   // Insert gasto into DB
   const gasto = {
      name: `${roommate.name} ${roommate.lastname}`,
      description: gastos.description,
      amount: gastos.amount,
   }
   await gdb.addData(gasto)
   // Redirect to index
   res.redirect("/")
}

// PUT
const updateGasto = async (req, res, next) => {
   // Shortcircuit method
   const method = res.locals._method
   if (method !== "PUT") next()
   // Get data from request
   const gastos = req.body
   await gdb.updateData(gastos.id, gastos)
}

// DELETE
const deleteGasto = async (req, res) => {}

module.exports = {
   getGastos,
   addGasto,
   updateGasto,
   deleteGasto,
}
