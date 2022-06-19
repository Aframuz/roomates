/*=============================================
=               DOM SELECTION                 =
=============================================*/
const editIcon = document.querySelectorAll(".edit-icon")
const editForm = document.querySelector("#edit-form")
const deleteIcon = document.querySelectorAll(".delete-icon")

/*=============================================
=              EVENT LISTENERS                =
=============================================*/
// For all edit icons, open modal with corresponding data in form
editIcon.forEach((icon) => {
   // Add CLICK eventListener to each icon
   icon.addEventListener("click", (event) => {
      // Get table row element where the icon is
      const tr = event.target.parentElement.parentElement
      const gastoData = {
         _id: tr.dataset.id,
         name: tr.children[0].innerText,
         description: tr.children[1].innerText,
         amount: tr.children[2].innerText,
      }
      // Get hidden input, set value to ID of gasto
      const hiddenId = document.querySelector("#hidden-id")
      hiddenId.value = gastoData._id
      // Get roommate-modal element, and set selected value to the data of the gasto clicked
      const roommateModal = document.querySelector("#roommate-modal")
      roommateModal.value = gastoData.name
      // Get description-modal element, and set value to the data of the gasto clicked
      const descriptionModal = document.querySelector("#description-modal")
      descriptionModal.value = gastoData.description
      // Get amount-modal element, and set value to the data of the gasto clicked
      const amountModal = document.querySelector("#amount-modal")
      amountModal.value = gastoData.amount
   })
})

// PUT request
editForm.addEventListener("submit", async (event) => {
   // Prevent form from submitting
   event.preventDefault()

   // Get data from form, parse to object
   const formData = new FormData(editForm)
   const FormDataObj = {}
   for (var [key, value] of formData.entries()) {
      FormDataObj[key] = value
   }

   // Fetch PUT
   try {
      const res = await fetch(`/gastos/${FormDataObj._id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(FormDataObj),
      })
      const data = await res.json()
      location.reload()
   } catch (error) {
      console.log(error)
   }
})

// DELETE request
// For all delete icons, delete corresponding gasto from database
deleteIcon.forEach((icon) => {
   // Add CLICK eventListener to each icon
   icon.addEventListener("click", async (event) => {
      // Get table row element where the icon is
      const tr = event.target.parentElement.parentElement
      const gastoData = {
         _id: tr.dataset.id,
         name: tr.children[0].innerText,
         description: tr.children[1].innerText,
         amount: tr.children[2].innerText,
      }

      // Fetch DELETE
      try {
         const res = await fetch(`/gastos/${gastoData._id}`, {
            method: "DELETE",
         })
         const data = await res.json()
         location.reload()
      } catch (error) {
         console.log(error)
      }
   })
})
