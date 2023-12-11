const { Router } = require('express')
const { check } = require('express-validator')
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias.controller')

const { existeCategoria } = require('../helpers/db-validators')

const {
  validarJWT,
  validarCampos,
  tieneRole,
  esAdminRole,
} = require('../middlewares')

const router = Router()

// Obtener todas las categorías - público
router.get('/', obtenerCategorias)

// Obtener una categoría por ID - público
router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
)

// Crear una categoría - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
)

// Actualizar - privado - cualquiera con token válido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
)

// Borrar una categoría - Admin
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
  ],
  borrarCategoria
)

module.exports = router
