import jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

export const isAuthenticated = (request, response, next) => {
  const { headers } = request;

  const authHeader = headers.authorization; // "Bearer XXXXXX" || undefined

  if (!authHeader) {
    response.status(401).json({
      data: null,
      message: ' El header authorization no esta presente en la peticion',
    });
    return;
  }
// separo el token (bearer xxxx) y me quedo con la posicion 1 que es xxxxx
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    // creo un campo user en request con los datos del usuario que
    // vienen en payload para usarlo despues
    request.user = payload.user;

    next();
  } catch (e) {
    response.status(401).json({
      data: null,
      message: 'Token invalido o expirado',
    });
  }
};
