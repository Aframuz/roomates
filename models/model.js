const fs = require("fs-extra")
const path = require("path")

class Model {
   constructor(name) {
      let _name = name
      let _path = path.join("db", `${_name}.json`)

      this.getName = () => _name
      this.getPath = () => _path

      // INIT DB iife
      ;(async function init() {
         try {
            // Ensure file exists
            const exists = await fs.pathExists(_path)
            // If file does not exist, create it
            if (!exists) {
               // Stump with name of DB
               const stump = {}
               stump[_name] = []
               // Write to file
               await fs.writeJson(_path, stump)
            } else {
               console.log(`The database ${_name} already exists.`)
            }
         } catch (err) {
            console.error(
               `There was an error initializating the database:\n${err.message}`
            )
         }
      })()
   }

   // Get all the data from DB
   async getAllData() {
      try {
         // Read the DB and parse it to obj
         const data = await fs.readJson(this.getPath())
         // Return the data array
         return data[this.getName()]
      } catch (err) {
         console.error(`There was an error getting all data:\n${err.message}`)
      }
   }

   // Add data to DB
   async addData(data) {
      try {
         // Read the DB and parse it to obj
         const dataFromDB = await fs.readJson(this.getPath())
         // Add data to DB
         dataFromDB[this.getName()].push(data)
         // Write to DB
         await fs.writeJson(this.getPath(), dataFromDB)
         console.log(`Data added to ${this.getName()}`)
      } catch (err) {
         console.error(`There was an error adding data:\n${err.message}`)
      }
   }

   // Update data in DB
   async updateDataById(id, newData) {
      try {
         // Read the DB and parse it to obj
         const dataFromDB = await fs.readJson(this.getPath())

         // Ensure data with ID provided exists
         const exist = dataFromDB[this.getName()].some((item) => item.id === id)
         if (!exist) {
            throw new Error("The data does not exist.")
         }

         // Loop through DB, find the data with the ID provided, and update it
         for (const data of dataFromDB[this.getName()]) {
            if (data.id === id) {
               dataFromDB[this.getName()].splice(
                  dataFromDB[this.getName()].indexOf(data),
                  1,
                  newData
               )
               break
            }
         }

         // Write to DB
         await fs.writeJson(this.getPath(), dataFromDB)
         console.log(`Data updated in ${this.getName()}`)
      } catch (err) {
         console.error(`There was an error updating data:\n${err.message}`)
      }
   }

   // Delete data from DB by ID
   async deleteDataById(id) {
      try {
         // Read the DB and parse it to obj
         const dataFromDB = await fs.readJson(this.getPath())

         // Ensure data with ID provided exists
         const exist = dataFromDB[this.getName()].some((item) => item.id === id)
         if (!exist) {
            throw new Error("The data does not exist.")
         }

         // Loop through DB, find the data with the ID provided, and delete it
         for (const data of dataFromDB[this.getName()]) {
            if (data.id === id) {
               dataFromDB[this.getName()].splice(
                  dataFromDB[this.getName()].indexOf(data),
                  1
               )
               break
            }
         }

         // Write to DB
         await fs.writeJson(this.getPath(), dataFromDB)
         console.log(`Data deleted from ${this.getName()}`)
      } catch (err) {
         console.error(`There was an error deleting data:\n${err.message}`)
      }
   }

   // Create a copy of the DB
   async copyDB() {
      try {
         // Create new path to DB copy
         const newPath = path.join(
            __dirname,
            "db",
            `${this.getName()}-backup.json`
         )
         // Copy DB
         await fs.copy(this.getPath(), newPath)
         console.log(`${this.getName()} copied to ${newPath}`)
      } catch (error) {
         console.error(`There was an error copying the DB:\n${err.message}`)
      }
   }

   // Restore DB from copy
   async restoreDB() {
      try {
         // Ensure DB copy exists
         const pathToCopy = path.join(
            __dirname,
            "db",
            `${this.getName()}-backup.json`
         )
         const exists = await fs.pathExists(pathToCopy)
         if (!exists) {
            throw new Error("The backup does not exist.")
         }

         // Restore DB
         await fs.copy(pathToCopy, this.getPath(), { overwrite: true })
         console.log(`${this.getName()} restored from backup`)
      } catch (err) {
         console.log(`There was an error restoring the DB:\n${err.message}`)
      }
   }
}

module.exports = { Model }
