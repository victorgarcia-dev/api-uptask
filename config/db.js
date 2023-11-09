import mongoose from 'mongoose';

export const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`mongoDb conectado  en ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1); //fuerza a detener la base de datos
    }

}