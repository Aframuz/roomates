/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const express = require("express")
// local Modules
const roomateController = require("../controllers/roommate-controller")
const middleware = require("../middleware/get-rnd-user")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router
   .route("/")
   .post(middleware.getRndUser, roomateController.addRoommate)
   .get(roomateController.getRoommates)

module.exports = router
