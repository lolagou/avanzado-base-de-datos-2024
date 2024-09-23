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
        if (!req.body.usuario) return res.status(400).send("No se encontro un usuario en el body de la request");
        const {usuario} = req.body
        if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.password) return res.status(400).send("Atributos de usuario ivnalidos"); 
        const usuarioExiste = await UsuariosService.getUsuarioByEmail(usuario.email)
        if (usuarioExiste) return res.status(400).send(`Usuario con mail ${usuario.email} ya existe`);
        usuario.password = await bcrypt.hash(usuario.password, 10)
        const GuardarUsuario = await UsuariosService.createUsuario(usuario)
        if (GuardarUsuario) {
            return res.status(201).send("Usuario registrado correctamente");
        }
        return res.status(500).send("No se pudo guardar el usuario");
    } catch (error) { 
        res.status(500).send("Error durante la creación del usuario");
    }


//hacer adm al usuario

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
                    const { email, password } = req.body;
                    if (!email || !password) return res.status(400).send("Email y contraseña son requeridos");
            
                    const usuario = await UsuariosService.getUsuarioByEmail(email);
                    if (!usuario) return res.status(400).send("Usuario no encontrado");
            
                    const esCorrectaLaPassword = await bcrypt.compare(password, usuario.password);
                    if (!esCorrectaLaPassword) return res.status(400).send("Contraseña incorrecta");
            
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
                } catch (error) {
                    res.status(500).send("Error en el proceso de inicio de sesión");
                }
            };
            
export default { register, login };