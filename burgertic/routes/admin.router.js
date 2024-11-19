import Router from "express";
import UsuarioService from '../services/usuarios.service.js'
import { verifyToken ,verifyAdmin } from "../middlewares/auth.middleware.js";
import newadmController from "../controllers/newadm.controller.js";

const router = Router();

router.get("/:id", newadmController.upgradeUsuario); 

export default router;