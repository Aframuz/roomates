/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const { nanoid } = require("nanoid")
// local Modules
const { gdb } = require("../models/gastos-model")
const { rdb } = require("../models/roommates-model")

/*=============================================
=                  HANDLERS                   =
=============================================*/
// GET
const getGastos = async (req, res) => {
   try {
      // Get gastos from database
      const gastos = await gdb.getAllData()
      // Show gastos in JSON format
      res.status(200).json(gastos)
   } catch (err) {
      // Show error in JSON format
      res.status(500).json({ message: err.message })
   }
}

// POST
const addGasto = async (req, res) => {
   try {
      // Get data from request
      const gastos = req.body
      // get roommate from database by ID (gastos.roommate === _id)
      const roommate = await rdb.getDataById(gastos.roommate)
      // Insert gasto into DB, insert gasto into roommate.expenses
      const _id = nanoid(6) // resusable id
      const gasto = {
         _id: _id,
         name: `${roommate.name} ${roommate.lastname}`,
         description: gastos.description,
         amount: gastos.amount,
      }
      await gdb.addData(gasto)
      await rdb.addGastoToRoommate(gastos.roommate, _id)
      // Redirect to index
      res.status(200).redirect("/")
   } catch (err) {
      // Show error in JSON format
      res.status(500).json({ message: err.message })
   }
}

// PUT
const updateGasto = async (req, res) => {
   try {
      // Get gasto id from request parameter
      const _id = req.params.id
      // Get gasto data from request body
      const gastoToUpdate = req.body
      // Update gasto in DB
      await gdb.updateDataById(_id, gastoToUpdate)
      // Respond with a message
      res.status(200).json({ message: "Gasto updated" })
   } catch (err) {
      // Show error in JSON format
      res.status(500).json({ message: err.message })
   }
}

// DELETE
const deleteGasto = async (req, res) => {
   try {
      // Get gasto id from request parameter
      const _id = req.params.id
      // Delete gasto from DB, delete gasto reference from correponding roommate
      await gdb.deleteDataById(_id)
      await rdb.deleteGastoReference(_id)
      // Respond with a message
      res.status(200).json({ message: "Gasto deleted" })
   } catch (err) {
      // Show error in JSON format
      res.status(500).json({ message: err.message })
   }
}

module.exports = {
   getGastos,
   addGasto,
   updateGasto,
   deleteGasto,
}
