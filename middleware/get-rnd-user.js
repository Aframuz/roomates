/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const { nanoid } = require("nanoid")

/*=============================================
=                 MIDDLEWARE                  =
=============================================*/
// Get random user from API_URL
const getRndUser = async (req, res, next) => {
   // API Url and Query Params
   const API_URL = "https://randomuser.me/api/"
   const API_OPTIONS = new URLSearchParams({ inc: "name" })

   // API Call
   const response = await fetch(`${API_URL}?${API_OPTIONS}`)
   const { results } = await response.json()

   // Generate user, store it in res.locals
   const user = {
      id: nanoid(6),
      name: results[0].name.first,
      lastname: results[0].name.last,
      debt: 0,
      receive: 0,
   }
   res.locals.user = user

   // Call next middleware
   next()
}

module.exports = { getRndUser }
