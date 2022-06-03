/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
// IMPORT MODELS HERE

/*=============================================
=                  HANDLERS                   =
=============================================*/
const insertRoommate = (req, res) => {
   console.log("add roommate")
}

// GET getUsers route
const showUsers = (req, res) => {
   // render view
   res.render("users", { users: userList })
}

module.exports = {
   insertRoommate,
}
