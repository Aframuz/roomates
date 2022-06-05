/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const express = require("express")
// local Modules
const { renderIndex } = require("../controllers/index")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.get("/", renderIndex)

module.exports = router
