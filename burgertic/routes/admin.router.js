import Router from "express";
import UsuarioService from '../services/usuarios.service.js'
import { verifyToken ,verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", () => {
    upgradeUsuario (1); 
});

export default router;