import Joi from 'joi';

export const post_userSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30)
  .required()
  .messages({
      'string.min': 'El campo username debe tener al menos 3 caracteres',
      'string.max': 'El campo username debe tener como maximo 30 caracteres',
      'any.required': 'El campo username es requerido',
      '*': 'Revisa el campo username',
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
  