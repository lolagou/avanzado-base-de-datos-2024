import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */
    try {
        let {nombre, apellido, email, password} = req.body
        if (!nombre || !apellido || !email || !password) return res.status(400).send("Atributos de usuario ivnalidos"); 
        const usuarioExiste = await UsuariosService.getUsuarioByEmail(email)
        if (usuarioExiste) return res.status(400).send(`Usuario con mail ${email} ya existe`);
        password = await bcrypt.hash(password, 10)
        const GuardarUsuario = await UsuariosService.createUsuario(nombre, apellido, email, password)
        if (GuardarUsuario) return res.status (201).send ("Salio todo bien")
        if(!GuardarUsuario) return res.states (400).send ("No salio bien")
    }
    catch (error){ 
        res.status (400).send ("Algo fallo hasta el momento")
    }

    
    

};

const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
        try {
            const {usuario} = req.body
            if (!usuario.email || !usuario.password) return res.status(400).send("Atributos de usuario ivnalidos"); 
            usuario = await bcrypt.compare(usuario, 10)
            usuario.password = await bcrypt.compare(usuario.password, 10)
        } catch (error){
            res.status (400).send ("Algo fallo hasta el momento")
        }

        const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2m' });
    
        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre
            },
            token
        });
    
    };

export default { register, login };