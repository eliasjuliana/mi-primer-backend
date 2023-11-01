import UserCollection from '../models/userSchema.js'

export const getUsers = async (_, response) =>{
    try{
        const data = await UserCollection.find({});
        response.json(data);
    } catch (e) {
        console.error(e);

        response.status(500).json({
            message: 'Ocurrio un error al conectarse a la DB'
        });
    }
};