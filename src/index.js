import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//1. Iniciar la aplicacion
const app = express();

//2. Configuraciones generales
const PORT = process.env.PORT || 5000;

console.log(process.env);

//3. Middlewares
app.use(morgan("dev"));
app.use(cors()); //CROSS-ORIGIN-RESOURCE-SHARING
app.use(express.json());

//4.Rutas

//5. Iniciar el loop del servidor
app.listen(()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})