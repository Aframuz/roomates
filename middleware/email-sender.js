const nodemailer = require("nodemailer")

const sendEmails = async (emails, gasto) => {
   const transporterOptions = {
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: "409628c13abd7e",
         pass: "0cca3b7f887386",
      },
   }

   const transporter = nodemailer.createTransport(transporterOptions)

   const mailOptions = {
      from: "admin@example.com",
      to: emails,
      subject: "Se ha añadido un nuevo gasto!",
      text: `${gasto.name} ha gastado ${gasto.amount}`,
      html: `<div style="text-align: center">
            <h1>Nuevo gasto!</h1>
            <h2>Nombre</h2>
            <p>${gasto.name}</p>
            <h2>Monto:</h2>
            <p>${gasto.amount}</p>
            <h2>Descripcion</h2>
            <p>
            ${gasto.description}
            </p>
            </div>`,
   }
   try {
      const resp = await transporter.sendMail(mailOptions)
      console.log(`The email was sent successfully`)
   } catch (err) {
      console.log(err)
   }
}

module.exports = sendEmails
