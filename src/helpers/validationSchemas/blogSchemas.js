import Joi from 'joi';

export const post_blogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30)
.required()
.messages({
    'string.min': 'El campo title debe tener al menos 3 caracteres',
    'string.max': 'El campo title debe tener como maximo 30 caracteres',
    'any.required': 'El campo title es requerido',
    '*': 'Revisa el campo title',
  }),
  'image-url': Joi.string().uri().trim().required()
.messages({
    'string.uri': 'El campo image-url debe ser una url valida',
    'any.required': 'El campo image-url es requerido',
    '*': 'Revisa el campo image-url',
  }),
  content: Joi.string().trim().min(3).max(1000)
.required()
.messages({
    'string.min': 'El campo content debe tener al menos 3 caracteres',
    'string.max': 'El campo content debe tener como maximo 1000 caracteres',
    'any.required': 'El campo content es requerido',
    '*': 'Revisa el campo content',
  }),
});

export const put_blogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(30)
.messages({
    'string.min': 'El campo title debe tener al menos 3 caracteres',
    'string.max': 'El campo title debe tener como maximo 30 caracteres',
    'any.required': 'El campo title es requerido',
    '*': 'Revisa el campo title',
  }),
  'image-url': Joi.string().uri().trim().messages({
    'string.uri': 'El campo image-url debe ser una url valida',
    'any.required': 'El campo image-url es requerido',
    '*': 'Revisa el campo image-url',
  }),
  content: Joi.string().trim().min(3).max(500)
.messages({
    'string.min': 'El campo content debe tener al menos 3 caracteres',
    'string.max': 'El campo content debe tener como maximo 30 caracteres',
    'any.required': 'El campo content es requerido',
    '*': 'Revisa el campo content',
  }),
}).custom((value, helper) => {
  const { title, content } = value;
  const imageUrl = value['image-url'];

  if (!title && !content && !imageUrl) {
    return helper.message('Al menos un campo debe estar presente en el body');
  }

  return true;
});
