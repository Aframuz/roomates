/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const { nanoid } = require("nanoid")

/*=============================================
=                 MIDDLEWARE                  =
=============================================*/
const methodOverride = (req, res, next) => {
   // Get method from request
   console.log(`Its a ${req.body._method} request`)
   res.locals._method = req.body._method
   next()
}

module.exports = { methodOverride }
