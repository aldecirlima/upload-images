const Sequelize = require('sequelize')

const sequelize = new Sequelize('usi_images', 'site_disin', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function() {
    console.log("Conexão com banco de dados realizada com sucesso!")
}).catch(function() {
    console.log("Erro: conexão com o banco de dados não realizada!")
})

module.exports = sequelize;