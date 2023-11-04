export const isAdmin = (request, response, next) => {
  const {
    user,
  } = request;

  if (!user.isAdmin) {
    response.status(403).json({
      data: null,
      message: 'No tienes acceso a este recurso',
    });
    return;
  }

  next();
};
