const Role = require('../models/role')
const { Usuario, Categoria, Producto } = require('../models')

const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol })

  if (!existeRol) {
    // Error personalizado
    throw new Error(`El Rol ${rol} no está registrado en la base de datos.`)
  }
}

const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo })
  if (existeEmail) {
    throw new Error(`El Correo ${correo} ya está registrado.`)
  }
}

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id)
  if (!existeUsuario) {
    throw new Error(`El ID no existe: ${id}.`)
  }
}

const existeCategoria = async (id) => {
  const existe = await Categoria.findById(id)
  if (!existe) {
    throw new Error(`El ID no existe: ${id}.`)
  }
}

const existeProducto = async (id) => {
  const existe = await Producto.findById(id)

  if (!existe) {
    throw new Error(`El ID no existe: ${id}.`)
  }
}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoria,
  existeProducto,
}
