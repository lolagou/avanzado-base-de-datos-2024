import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { Usuario } from "./usuarios.model.js";

export class Pedido extends Model {}

Pedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'id',
            },
        },
        fecha: {
            type: DataTypes.DATE,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["pendiente", "aceptado", "en camino", "entregado"]],
            }
        }
    },

    {
        sequelize,
        modelName: "Pedido",
        tableName: "pedidos",
        timestamps: false,
    }
);