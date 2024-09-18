import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/pedidos", PedidosController.getPedidos);
router.get("/usuario", PedidosController.getPedidosByUser);
router.get("/:id", PedidosController.getPedidoById);
router.post("/crear", verifyToken, verifyAdmin, PedidosController.createPedido);
router.post("/aceptar", verifyAdmin, PedidosController.aceptarPedido);
router.put("/comenzar", verifyAdmin, PedidosController.comenzarPedido);//no esta declarado  en controllers
router.put("/entregar", verifyAdmin,PedidosController.entregarPedido);
router.delete("/eliminar", verifyToken,PedidosController.deletePedido);

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

export default router;
