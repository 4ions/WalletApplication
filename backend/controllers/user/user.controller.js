const { Sequelize } = require("sequelize");
const { User, UserCoin } = require("../../db/models")
const sequelize = require("../../db/models/index").sequelize

const controllers = {
    // Obtener informacion de usuario
    getUser: async (req, res) => {
        const id = req.params.id;

        if (!id) res.status(400).json({error: 'No se ha enviado el id'});

        const user = await User.findByPk(id);

        if (!user) res.status(404).json({error: 'No se ha encontrado el usuario'});

        return res.status(200).json(user);

    },

    // Crear usuario
    // Actualizar usuario
    // Eliminar usuario

    getUsers: async (req, res) => {
        const users = await User.findAll();

        if (!users) res.status(404).json({error: 'No se han encontrado usuarios'});

        return res.status(200).json(users);
    },
}

module.exports = controllers;