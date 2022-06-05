/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Core Modules
const fs = require("fs")
const path = require("path")

/*=============================================
=                  VARIABLES                  =
=============================================*/
const filePath = path.join(__dirname, "/db/roommates.json")

const addRoommate = (roommate) => {
   // recibe nuevo roommate
   // extraer todos los roommates, parse a array
   // agregar nuevo roommate al array
   // escribir en el archivo

   const roommateJson = JSON.parse(roommate)
   fs.stat(filePath, (err, stats) => {
      if(err){
         if(err.code === "ENOENT") {
            fs.writeFileSync(filePath, roommate)
         } else {
            throw err
         }
      } else {
         fs.open(filePath, )
      }

   })
}
