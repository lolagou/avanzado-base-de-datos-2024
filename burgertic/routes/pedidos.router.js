import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", PedidosController.getPedidos);
router.get("/usuario/:user", PedidosController.getPedidosByUser);
router.get("/:id", PedidosController.getPedidoById);
router.post("/crear", verifyToken, verifyAdmin, PedidosController.createPedido);
router.post("/aceptar/:id", verifyToken, verifyAdmin, PedidosController.aceptarPedido);
router.put("/entregar/:id", verifyToken, verifyAdmin,PedidosController.entregarPedido);
router.delete("/eliminar/:id", verifyToken, verifyAdmin,PedidosController.deletePedido);

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

export default router;
