import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const upgradeUsuario = async (req, res) => {


    const id = parseInt(req.params.id);

    if (!id) return res.status(400).json({
        message: "El id no es numerico"
    });

    UsuariosService.upgradeUsuario (id); 
    res.json ({message: "usuario bien"});
};

export default {
    upgradeUsuario,
};