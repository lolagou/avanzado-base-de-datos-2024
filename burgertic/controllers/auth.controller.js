import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    // --------------- COMPLETAR REGISTER---------------
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


const register = async (req, res) => {
    try {
        const {usuario} = req.body; 
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const { nombre, apellido, email, password } = usuario;
        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({ message: "Faltan llenar los campos" });


const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ message: "Ya existe un usuario con este email" });
            }

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);


const nuevoUsuario = {
    nombre,
    apellido,
    email,
    password: hashedPassword
};

const usuarioGuardado = await UsuariosService.createUsuario(nuevoUsuario);

res.status(201).json({ message: "Usuario registrado ", usuario: usuarioGuardado});
}

};

const getUsuarioById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const usuario = await UsuariosService.getUsuarioById(id);
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const CreateUsuario = async (req, res) => {
    const plato = req.body;

    if (!plato)
        return res.status(400).json({ message: "Se necesita un usuario" });

    if (!usuario.email || !usuario.nombre || !usuario.password || !plato.descripcion)
        return res.status(400).json({ message: "Faltan campos por llenar" });

    try {
        await PlatosService.CreateUsuario(plato);
        res.json({ message: "Usuario creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//agregar export default 


    // --------------- COMPLETAR LOGIN ---------------
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

            
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        const usuario = await UsuariosService.getUsuarioByEmail(email);
        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const passwordValida = bcrypt.compareSync(password, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};

export default { register, login };



