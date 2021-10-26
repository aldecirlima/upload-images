const Sequelize = require('sequelize')
const db = require('./db')

const Image = db.define('images', {
    id: {
        type: Sequelize.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING,
    }
})


// Função para criar a tabela, depois de criada não precisa mais
// Image.sync();

module.exports = Image;