/*=============================================
=              IMPORT MODULES                =
=============================================*/
// local Modules
// IMPORT MODELS HERE
// Core Modules

/*=============================================
=                  HANDLERS                   =
=============================================*/
const renderIndex = (req, res) => {
   res.render("index")
}

module.exports = {
   renderIndex,
}
