/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const express = require("express")
// local Modules
const gastoController = require("../controllers/gasto-controller")

/*=============================================
=           VARIABLES & MIDDLEWARE            =
=============================================*/
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router
   .route("/:id")
   .put(gastoController.updateGasto)
   .delete(gastoController.deleteGasto)

router.route("/").post(gastoController.addGasto).get(gastoController.getGastos)

module.exports = router
