import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
router.put("/newadm", verifyToken, verifyAdmin, Newadm.Controller.ConvertirUsuario);
export default router;