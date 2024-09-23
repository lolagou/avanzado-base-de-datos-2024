import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const ConvertirUsuario = async (req, res) => {


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