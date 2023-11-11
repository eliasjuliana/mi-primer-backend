import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userSchema.js';

const { JWT_SECRET_KEY } = process.env;

export const postLogin = async (request, response) => {
  const {
    body: { username, password },
  } = request;

  try {
    const userInDB = await UserModel.findOne({ username, isActive: true });

    // si el usuario no existe o no coinciden las contraseñas
    if (!userInDB || !bcrypt.compareSync(password, userInDB.password)) {
      response.status(400).json({
        data: null,
        message: 'usuario o contraseña incorrectos',
      });
      return;
    }

    // todo ok, continuar con la creacion del token
    const userInfo = {
      user: {
        id: userInDB._doc._id,
        firstname: userInDB._doc.firstname,
        lastname: userInDB._doc.lastname,
        username: userInDB._doc.username,
        isAdmin: userInDB._doc.isAdmin,
      },
    };

    // parametros(payload, secretKey, options es un objeto)
    const token = jwt.sign(userInfo, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    response.json({
      data: token,
      message: 'Usuario logueado exitosamente',
    });
  } catch (e) {
    response.status(500).json({
      data: null,
      message: 'Ocurrio un error en el inicio de sesión',
    });
  }
};
