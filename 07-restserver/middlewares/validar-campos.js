const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  // Si pasa, llega a otro middleware o al controlador
  next()
}

module.exports = {
  validarCampos,
}
