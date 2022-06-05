/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const express = require("express")
// local Modules
const { insertRoommate } = require("../controllers/roommate")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.post("/", insertRoommate).get("/")

module.exports = router
