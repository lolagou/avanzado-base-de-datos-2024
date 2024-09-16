import Router from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE LOGIN Y REGISTER -------------
router.post("/", verifyToken, verifyAdmin, AuthController.createUsuario);
router.put("/:id", verifyToken, verifyAdmin, AuthController.getUsuarioById);
router.delete("/:id", verifyToken, verifyAdmin, AuthController.getUsuarioByEmail);
export default router;
