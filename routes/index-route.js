/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const express = require("express")
// local Modules
const indexController = require("../controllers/index-controlller")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.get("/", indexController.renderIndex)

module.exports = router
