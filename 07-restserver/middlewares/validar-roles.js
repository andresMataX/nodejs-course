const { request, response } = require('express')

// Cuando los middlewares modifican la req, los middlewares siguientes tienen esas modificaciones
const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin verificar primero el token.',
    })
  }

  const { rol, nombre } = req.usuario

  if (rol !== 'ADMIN_ROLE') {
    return res.status(500).json({
      msg: `${nombre} no es admin. No puede hacer esto.`,
    })
  }

  next()
}

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin verificar primero el token.',
      })
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      })
    }

    next()
  }
}

module.exports = {
  esAdminRole,
  tieneRole,
}
