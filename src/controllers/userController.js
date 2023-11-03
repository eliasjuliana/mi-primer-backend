import bcrypt from 'bcryptjs';

import UserModel from '../models/userSchema.js';

export const getUsers = async (_, response) => {
  try {
    const data = await UserModel.find({});

    const filteredData = data
      .filter((user) => user._doc.isActive === true)
      .map((user) => ({
        ...user._doc,
        password: undefined,
        isActive: undefined,
      }));

    response.json({ data: filteredData, message: 'Usuarios encontrados' });
  } catch (e) {
    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al conectarse a la DB',
    });
  }
};

export const postUser = async (request, response) => {
  const { body } = request;

  const hashedPassword = bcrypt.hashSync(body.password, 10);

  const newUser = new UserModel({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    password: hashedPassword,
    isActive: true,
    isAdmin: false,
  });

  try {
    await newUser.save();

    response.status(201).json({
      data: null,
      message: 'Usuario creado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      response.status(400).json({
        data: null,
        message: 'El nombre de usuario ya esta en uso',
      });
      return;
    }

    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al guardar el usuario',
    });
  }
};

export const putUser = async (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  if (body.password) {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    body.password = hashedPassword;
  }

  try {
    const action = await UserModel.updateOne({ _id: id }, body);

    if (action.modifiedCount === 0) {
      response.status(400).json({
        data: null,
        message: 'No se encontro un usuario con ese id',
      });
      return;
    }

    response.json({
      data: null,
      message: 'El usuario ha sido actualizado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      response.status(400).json({
        data: null,
        message: 'El nombre de usuario ya esta en uso',
      });
      return;
    }

    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al actualizar el usuario',
    });
  }
};

export const deleteUser = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    const action = await UserModel.updateOne({ _id: id, isActive: true }, { isActive: false });

    if (action.matchedCount === 0) {
      response.status(400).json({
        data: null,
        message: 'No se encontro un usuario con ese id',
      });
      return;
    }

    response.json({
      data: null,
      message: 'El usuario ha sido eliminado exitosamente',
    });
  } catch (e) {
    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al eliminar el usuario',
    });
  }
};
