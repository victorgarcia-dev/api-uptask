import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

//hashear password antes de guardar en l BD
usuarioSchema.pre('save', async function(next){
    //verificar que el password no fue modificado
    if(!this.isModified('password')){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash( this.password, salt );
})

//comprobar el password
usuarioSchema.methods.comprobarPassword = async function( passwordForm ){
    return await bcrypt.compare( passwordForm, this.password);
}

export const Usuario = mongoose.model( 'Usuario', usuarioSchema );