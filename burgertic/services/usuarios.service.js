import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;

const getUsuarioByEmail = async (email) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getUsuarioById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const createUsuario = async (usuarioNombre, usuarioApellido, usuarioEmail, usuarioPassword) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, admin) VALUES ($1, $2, $3, $4, false)",
            [usuarioNombre, usuarioApellido, usuarioEmail, usuarioPassword]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const ConvertirUsuario = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            'UPDATE usuarios SET "admin" = true WHERE "id" = $1' 
            [id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const upgradeUsuario = async (id) => {
    await client.query ("UPDATE usuarios SET admin=true WHERE id = $1", [id])
    
};

export default { upgradeUsuario, getUsuarioByEmail, getUsuarioById, createUsuario, ConvertirUsuario };
