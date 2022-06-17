/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const { nanoid } = require("nanoid")
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
   res.redirect("/")
}

// POST
const addGasto = async (req, res) => {
   // Get data from request
   const gastos = req.body
   // get roommate from database by ID
   const roommate = await rdb.getDataById(gastos.roommate)
   // Insert gasto into DB
   const gasto = {
      _id: nanoid(6),
      name: `${roommate.name} ${roommate.lastname}`,
      description: gastos.description,
      amount: gastos.amount,
   }
   await gdb.addData(gasto)
   // Redirect to index
   res.redirect("/")
}

// PUT
const updateGasto = async (req, res) => {
   const _id = req.params.id
   const gastoToUpdate = req.body

   await gdb.updateDataById(_id, gastoToUpdate)

   res.json({ message: "Gasto updated" })
}

// DELETE
const deleteGasto = async (req, res) => {
   const _id = req.params.id
   await gdb.deleteDataById(_id)

   res.json({ message: "Gasto deleted" })
}

module.exports = {
   getGastos,
   addGasto,
   updateGasto,
   deleteGasto,
}
