/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const express = require("express")
// local Modules
const gastoController = require("../controllers/gasto-controller")
// const middleware = require("../middleware")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").post(gastoController.addGasto).get()

module.exports = router
