"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = void 0;
const obtenerUsuarios = (req, res) => {
    res.json({
        msg: 'Obtener Usuarios'
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Obtener Usuario',
        id
    });
};
exports.obtenerUsuario = obtenerUsuario;
const crearUsuario = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'Crear Usuario',
        body
    });
};
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'Actualizar Usuario',
        body
    });
};
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'Eliminar Usuario',
        id
    });
};
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.js.map