/*=============================================
=                 MIDDLEWARE                  =
=============================================*/
// Return a formatted version of roommates with debts
calculateDebt = (options) => {
   // Destructuring options
   const { roommatesRaw, gastos, totalAmount, numOfRoommates } = options

   // If there are no roommates, return empty array
   if (!numOfRoommates) {
      console.log(`There are no roommates in the database!`)
      return []
   }

   // Calculate split amount that every roommate should debt each other
   const split = totalAmount / numOfRoommates

   // Take every roommate, format it and add debt and receive
   const formattedRoommates = roommatesRaw.map((roommate) => {
      let debt, receive

      // If roommate has no expenses, they have to pay split, else calculate debt and receive
      if (roommate.expenses.length === 0) {
         debt = split
         receive = 0
      } else {
         // Get total expenses from roommate (transform expenses array of ids to total expenses)
         const expenses = roommate.expenses
            .map((expense) => {
               const expenseAmount = gastos.find(
                  (gasto) => gasto._id === expense
               ).amount
               return expenseAmount
            })
            .reduce((acc, expense) => acc + +expense, 0)

         // Calculate receive and debt
         receive = expenses / numOfRoommates
         debt = split - receive
      }

      // Formatted roommate
      return {
         _id: roommate._id,
         name: roommate.name,
         lastname: roommate.lastname,
         debt: +debt,
         receive: +receive,
      }
   })

   return formattedRoommates
}

module.exports = calculateDebt
