import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { Usuario } from "./usuarios.model.js";

export class Usuario extends Model {}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.FLOAT,
        },
        password: {
            type: DataTypes.STRING,
        },
        admin: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: "usuarios",
        timestamps: false,
    }
);
