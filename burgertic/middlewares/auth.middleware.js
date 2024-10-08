import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";
import 'dotenv/config'

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
        try {
            if (!req.headers.authorization) {
                return res.status(401).json({ message: 'No hay token' });
            }
            const token = req.headers.authorization.split(" ")[1]
            if (!token) return res.status(400).send("Formato incorrecto");

    
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
            if (!decoded || !decoded.id) {
                return res.status(401).json({ message: 'Invalid token: No se encontro UserId' });
            }

            req.userId = decoded.id;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)

            update 
    
    */
            try {
                const authHeader = req.headers.authorization;
                const secret = process.env.JWT_SECRET;
        
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({ message: 'Falta header' });
                }
        
                const token = authHeader.split(' ')[1]; 
                const decoded = jwt.verify(token, secret); 
                const id = decoded.id;
        
                console.log(`user id: ${id}`);
                
                const user = await UsuariosService.getUsuarioById(id);
        
                console.log(`User: ${JSON.stringify(user)}`);
        
                if (!user || !user.admin) {
                    return res.status(403).json({ message: 'Solo adm' });
                }
                next();
            } catch (error) {
                return res.status(500).json({ message: 'error del servidor', error: error.message });
            }
        };
