import Joi from 'joi';

export const post_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30)
.required()
.messages({
    'string.min': 'El campo firstname debe tener al menos 3 caracteres',
    'string.max': 'El campo firstname debe tener como maximo 30 caracteres',
    'any.required': 'El campo firstname es requerido',
    '*': 'Revisa el campo firstname',
  }),
  username: Joi.string().trim().min(3).max(30)
.required()
.messages({
    'string.min': 'El campo username debe tener al menos 3 caracteres',
    'string.max': 'El campo username debe tener como maximo 30 caracteres',
    'any.required': 'El campo username es requerido',
    '*': 'Revisa el campo username',
  }),
  lastname: Joi.string().trim().min(3).max(30)
.required()
.messages({
    'string.min': 'El campo lastname debe tener al menos 3 caracteres',
    'string.max': 'El campo lastname debe tener como maximo 30 caracteres',
    'any.required': 'El campo lastname es requerido',
    '*': 'Revisa el campo lastname',
  }),
  password: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/)
    .messages({
      'string.min': 'El campo password debe tener al menos 3 caracteres',
      'string.max': 'El campo password debe tener como maximo 30 caracteres',
      'any.required': 'El campo password es requerido',
      'string.pattern.base':
        'La contraseña debe tener al menos un numero, una letra minuscula, una letra mayuscula, un caracter especial y un minimo de 8 caracteres',
      '*': 'Revisa el campo password',
    }),
});

export const put_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(30)
.messages({
    'string.min': 'El campo firstname debe tener al menos 3 caracteres',
    'string.max': 'El campo firstname debe tener como maximo 30 caracteres',
    '*': 'Revisa el campo firstname',
  }),
  username: Joi.string().trim().min(3).max(30)
.messages({
    'string.min': 'El campo username debe tener al menos 3 caracteres',
    'string.max': 'El campo username debe tener como maximo 30 caracteres',
    '*': 'Revisa el campo username',
  }),
  lastname: Joi.string().trim().min(3).max(30)
.messages({
    'string.min': 'El campo lastname debe tener al menos 3 caracteres',
    'string.max': 'El campo lastname debe tener como maximo 30 caracteres',
    '*': 'Revisa el campo lastname',
  }),
  password: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(.{8,})$/)
    .messages({
      'string.min': 'El campo password debe tener al menos 3 caracteres',
      'string.max': 'El campo password debe tener como maximo 30 caracteres',
      'string.pattern.base':
        'La contraseña debe tener al menos un numero, una letra minuscula, una letra mayuscula, un caracter especial y un minimo de 8 caracteres',
      '*': 'Revisa el campo password',
    }),
}).custom((value, helper) => {
  const {
 firstname, lastname, username, password,
} = value;

  if (!firstname && !lastname && !username && !password) {
    return helper.message('Al menos un campo debe estar presente en el body');
  }

  return true;
});

// el custom y el codigo que sigue se pone para que al menos
// se edite un campo y no se mande un objeto vacio
// ver clase 2/11
