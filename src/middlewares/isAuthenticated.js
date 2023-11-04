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

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    request.user = payload;

    next();
  } catch (e) {
    response.status(401).json({
        data: null,
        message: 'Token invalido o expirado',
    });
  }
};
