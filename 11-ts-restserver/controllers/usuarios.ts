import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const obtenerUsuarios = async (req: Request, res: Response) => {

  const usuarios = await Usuario.findAll();

  res.json(usuarios)

}

export const obtenerUsuario = async (req: Request, res: Response) => {

  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    res.json(usuario)
  } else {
    res.status(404).json({
      msg: `No existe un usuario con ID ${id}`
    })
  }

}

export const crearUsuario = async (req: Request, res: Response) => {

  const { body } = req;

  try {

    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    })

    if (existeEmail) {
      return res.status(400).json({
        msg: 'Ya existe un usuario con ese email ' + body.email
      })
    }

    const usuario = Usuario.build(body);
    await usuario.save();

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

}

export const actualizarUsuario = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { body } = req;

  try {

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(400).json({
        msg: 'No existe un usuario con el id ' + id
      })
    }

    await usuario.update(body);

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

}

export const eliminarUsuario = async (req: Request, res: Response) => {

  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(400).json({
      msg: 'No existe un usuario con el id ' + id
    })
  }

  // Eliminación física
  // await usuario.destroy();

  // Elimincación lógica
  await usuario.update({ estado: false });

  res.json(usuario);

}