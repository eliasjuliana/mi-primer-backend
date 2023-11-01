import UserModel from '../models/userSchema.js'
import bcrypt from "bcryptjs"

export const getUsers = async (_, response) =>{
    try{
        const data = await UserModel.find({});

        const filteredData = data.map((user)=>({
            ...user._doc,
            password: undefined,
        }))

        response.json({data: filteredData, message: 'Usuarios encontrados'});
    } catch (e) {
        console.error(e);

        response.status(500).json({
            dataa: null, 
            message: 'Ocurrio un error al conectarse a la DB'
        });
    }
};

export const postUser = async (request, response) => {
    const {body} = request;

    const hashedPassword = bcrypt.hashSync(body.password, 10)

    const newUser = new UserModel({
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        password: hashedPassword,
        isActive: true,
        isAdmin: false,
    });

    try{
        await newUser.save();

        response.status(201).json({
            data: null,
            message: 'Usuario creado exitosamente'
        })
    } catch (e){

        if(e.message.includes('dyplicate')){
            response.status(400).json({
                data: null,
                message: 'El nombre de usuario ya esta en uso'
            });
            return;
        }

        response.status(500).json({
            data: null,
            message: 'Ocurrio un error al guardar el usuario',
            error: e.message,
        })
    }
}