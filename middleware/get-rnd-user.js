/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party Modules
const { nanoid } = require("nanoid")
const axios = require("axios").default

/*=============================================
=                 MIDDLEWARE                  =
=============================================*/
// Get random user from API_URL
const getRndUser = async (req, res, next) => {
   try {
      // API Url and Query Params
      const API_OPTIONS = new URLSearchParams({ inc: "name" })

      // API Call with fetch
      const response = await fetch(`${process.env.API_URL}?${API_OPTIONS}`)
      const { results } = await response.json()

      // API Call with Axios
      // const response = await axios.get(`${process.env.API_URL}?${API_OPTIONS}`)
      // const { results } = await response.data

      // Generate user, store it in res.locals
      const user = {
         _id: nanoid(6),
         name: results[0].name.first,
         lastname: results[0].name.last,
         expenses: [],
      }
      res.locals.user = user
   } catch (err) {
      console.log(err)
   }

   // Call next middleware
   next()
}

module.exports = { getRndUser }
