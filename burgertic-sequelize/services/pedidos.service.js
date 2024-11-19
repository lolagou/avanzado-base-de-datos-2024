import { Pedido } from "../models/pedidos.model.js";
import { Plato } from "../models/platos.model.js"
import { PlatoxPedido } from "../models/platosxpedidos.model.js";

    const getPlatosByPedido = async (id) => {
        try {
            const platosxPedido = await PlatoxPedido.findAll({
                where: {
                    id_pedido: id,
                },
            });
    
            if (platosxPedido.length < 1) throw new Error("Pedido no encontrado");
    
            const result = await Promise.all(
                platosxPedido.map(async (platoPedido) => {
                    const plato = await Plato.findByPk(platoPedido.id_plato);
    
                    if (!plato) throw new Error("Plato no encontrado");
    
                    return {
                        ...plato.toJSON(),
                        cantidad: platoPedido.cantidad,
                    };
                })
            );
    
            return result;
        } catch (error) {
            throw error;
        }
    };


const getPedidos = async () => await Pedido.findAll();


const getPedidoById = async (id) => {
    const result = await Pedido.findOne({
        where: {
            id: id,
        },
    });
    return result;
};

const getPedidosByUser = async (idUsuario) => {
    const result = await Pedido.findAll({
        where: {
            id_usuario: idUsuario,
        },
    });
    return result;
};

const validarPlatos = async (platos) => {
    const platosValidos = [];
    for (let plato of platos) {
        const platoExistente = await Plato.findOne({
            where: { nombre: plato.nombre },
        });
        if (!platoExistente) {
            throw new Error(`Plato con nombre ${plato.nombre} no encontrado`);
        }
        platosValidos.push({
            id: platoExistente.id,
            cantidad: plato.cantidad,
        });
    }
    return platosValidos;
};

const crearPedido = async (idUsuario) => {
    const nuevoPedido = await Pedido.create({
        id_usuario: idUsuario,
        fecha: new Date(),
        estado: 'pendiente',
    });
    return nuevoPedido.id;
};

const agregarPlatosAPedido = async (idPedido, platosValidados) => {
    for (let plato of platosValidados) {
        await PlatoxPedido.create({
            id_pedido: idPedido,
            id_plato: plato.id,
            cantidad: plato.cantidad,
        });
    }
};

const createPedido = async (idUsuario, platos) => {
    try {
       
        const platosValidados = await validarPlatos(platos);
     
        const idPedido = await crearPedido(idUsuario);

        await agregarPlatosAPedido(idPedido, platosValidados);

        return { idPedido };
    } catch (error) {
        console.error("Error al crear el pedido:", error.message);
        throw error;
    }
};



const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        const pedido = await Pedido.findByPk(id);

        if (!pedido) throw new Error("Pedido no encontrado");

        pedido.estado = estado;
        await pedido.save();

        return pedido;
    } catch (error) {
        throw error;
    }
};

const deletePedido = async (id) => {
    try {
        const pedido = await Pedido.findByPk(id);

        if (!pedido) throw new Error("Pedido no encontrado");

        await pedido.destroy();
        return { message: "Pedido eliminado con éxito" };
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
    getPlatosByPedido,
    agregarPlatosAPedido,
    validarPlatos,
    crearPedido
};
