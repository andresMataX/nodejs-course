"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.obtenerUsuarios);
router.get('/:id', usuarios_1.obtenerUsuario);
router.post('/', usuarios_1.crearUsuario);
router.put('/:id', usuarios_1.actualizarUsuario);
router.delete('/:id', usuarios_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map