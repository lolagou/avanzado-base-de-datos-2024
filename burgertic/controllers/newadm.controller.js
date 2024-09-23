import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const ConvertirUsuario = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */

            const {id} = req.params;
    try {
        const admusuario = await UsuariosService.ConvertirUsuario(id);
        if (!admusuario) {
            return res.status(404).json({ message: "No se encontraron pedidos por id" });
        }
        res.status(200).json(admusuario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pedido por id", error: error.message });
    }
};

export default {
    ConvertirUsuario,
};