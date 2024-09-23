import Router from "express";
import ConvertirUsuario from '../controllers/newadm.controller.js'
import { verifyToken ,verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
// router.put("/newadm/:id", verifyToken, verifyAdmin, ConvertirUsuario);

export default router;