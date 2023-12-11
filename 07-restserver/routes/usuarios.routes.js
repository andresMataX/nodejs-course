/**
 * Rutas relacionadas con los usuarios
 * */
const { Router } = require('express')
const { check } = require('express-validator')

const { tieneRole, validarCampos, validarJWT } = require('../middlewares')

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require('../helpers/db-validators')

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require('../controllers/usuarios.controller')

const router = Router()

router.get('/', usuariosGet)

// Si se envían dos argumentos, uno es la ruta y el otro es el controlador
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
)

// Si se envían 3: 1 ruta, 2 middlewares y 3 controlador
router.post(
  '/',
  [
    // Verificamos el campo correo del body
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras.').isLength({
      min: 6,
    }),
    check('correo', 'El correo no es válido.').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol permitido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
)

router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
)

module.exports = router
