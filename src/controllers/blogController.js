import BlogModel from '../models/blogSchema.js';

export const getBlogs = async (_, response) => {
  try {
    const data = await BlogModel.find();

    const filteredData = data
      .filter((blog) => blog._doc.isActive === true)
      .map((blog) => ({
        ...blog._doc,
        isActive: undefined,
      }));

    response.json({ data: filteredData, message: 'Recetas encontradas' });
  } catch (e) {
    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al conectarse a la DB',
    });
  }
};

export const postBlog = async (request, response) => {
  const { body } = request;

  /* traigo BODY del FrontEnd */

  const newBlog = new BlogModel({
    title: body.title,
    imageUrl: body['image-url'],
    content: body.content,
    isActive: true,
  });

  try {
    await newBlog.save();

    response.status(201).json({
      data: null,
      message: 'Receta creada exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      response.status(400).json({
        data: null,
        message: 'El nombre de la receta ya esta en uso',
      });
      return;
    }

    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al guardar la receta',
    });
  }
};

export const putBlog = async (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  try {
    const action = await BlogModel.updateOne({ _id: id }, body);

    if (action.matchedCount === 0) {
      response.status(400).json({
        data: null,
        message: 'No se encontro una receta con ese id',
      });
      return;
    }

    response.json({
      data: null,
      message: 'La receta ha sido actualizada exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      response.status(400).json({
        data: null,
        message: 'El nombre de la receta ya esta en uso',
      });
      return;
    }

    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al actualizar la receta',
    });
  }
};

// DELETE
export const deleteBlog = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    const action = await BlogModel.updateOne(
      { _id: id, isActive: true },
      { isActive: false },
    );

    if (action.matchedCount === 0) {
      response.status(400).json({
        data: null,
        message: 'No se encontro una receta con ese id',
      });
      return;
    }

    response.json({
      data: null,
      message: 'La receta ha sido eliminada exitosamente',
    });
  } catch (e) {
    response.status(500).json({
      data: null,
      message: 'Ocurrio un error al eliminar la receta',
    });
  }
};
