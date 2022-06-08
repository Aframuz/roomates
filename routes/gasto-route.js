/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const { Router } = require("express")
const express = require("express")
const { append } = require("express/lib/response")
// local Modules
const gastoController = require("../controllers/gasto-controller")
const middleware = require("../middleware/method-override")

/*=============================================
=           VARIABLES & MIDDLEWARE            =
=============================================*/
const router = express.Router()

router.use(middleware.methodOverride)
/*=============================================
=                   ROUTES                    =
=============================================*/
router
   .route("/")
   .get()
   .post(gastoController.addGasto)
   .put(gastoController.updateGasto)
   .delete()

module.exports = router
