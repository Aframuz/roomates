const roommates = []
const gastos = []
let gastoEditing = null

const getRoommates = async () => {
   const res = await fetch("http://localhost:3000/roommates")
   const data = await res.json()
   roommates = data.roommates
}
const getGastos = async () => {
   const res = await fetch("http://localhost:3000/gastos")
   const data = await res.json()
   gastos = data.gastos
}

// const imprimir = async () => {
//    try {
//       await getRoommates()
//       await getGastos()
//       $("#roommates").html("")
//       $("#roommatesSelect").html("")
//       $("#roommatesSelectModal").html("")
//       roommates.forEach((r) => {
//          $("#roommatesSelect").append(`
//           <option value="${r.nombre}">${r.nombre}</option>
//           `)
//          $("#roommatesSelectModal").append(`
//           <option value="${r.nombre}">${r.nombre}</option>
//           `)
//          $("#roommates").append(`
//                   <tr>
//                     <td>${r.nombre}</td>
//                     <td class="text-danger">${r.debe ? r.debe : "-"}</td>
//                     <td class="text-success">${r.recibe ? r.recibe : "-"}</td>
//                   </tr>
//               `)
//       })
//       $("#gastosHistorial").html("")
//       gastos.forEach((g) => {
//          $("#gastosHistorial").append(`
//                 <tr>
//                   <td>${g.roommate}</td>
//                   <td>${g.descripcion}</td>
//                   <td>${g.monto}</td>
//                   <td class="d-flex align-items-center justify-content-between">
//                     <i class="fas fa-edit text-warning" onclick="editGasto('${g.id}')" data-toggle="modal" data-target="#exampleModal"></i>
//                     <i class="fas fa-trash-alt text-danger" onclick="deleteGasto('${g.id}')" ></i>
//                   </td>
//                 </tr>
//               `)
//       })
//    } catch (e) {
//       console.log(e)
//    }
// }

// const agregarGasto = async () => {
//    const roommateSelected = $("#roommatesSelect").val()
//    const descripcion = $("#descripcion").val()
//    const monto = Number($("#monto").val())
//    await fetch("http://localhost:3000/gasto", {
//       method: "POST",
//       body: JSON.stringify({
//          roommate: roommateSelected,
//          descripcion,
//          monto,
//       }),
//    })
//    imprimir()
// }

// const deleteGasto = async (id) => {
//    await fetch("http://localhost:3000/gasto?id=" + id, {
//       method: "DELETE",
//    })
//    imprimir()
// }

// const updateGasto = async () => {
//    const roommateSelected = $("#roommatesSelectModal").val()
//    const descripcion = $("#descripcionModal").val()
//    const monto = Number($("#montoModal").val())
//    await fetch("http://localhost:3000/gasto?id=" + gastoEditing, {
//       method: "PUT",
//       body: JSON.stringify({
//          roommate: roommateSelected,
//          descripcion,
//          monto,
//       }),
//    })
//    $("#exampleModal").modal("hide")
//    imprimir()
// }

// const editGasto = (id) => {
//    gastoEditing = id
//    const { roommate, descripcion, monto } = gastos.find((g) => g.id == id)
//    $("#roommatesSelectModal").val(roommate)
//    $("#descripcionModal").html(descripcion)
//    $("#montoModal").val(monto)
// }

// imprimir()

/*=============================================
=               REAFACTORIING                 =
=============================================*/
const editIcon = document.querySelectorAll(".edit-icon")
const deleteIcon = document.querySelectorAll("delete-icon")

// For all edit icons
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
const editForm = document.querySelector("#edit-form")

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
      console.log(data)
   } catch (error) {
      console.log(error)
   }
})
