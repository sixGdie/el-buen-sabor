const Sequelize = require('sequelize');

const Platos = require('./modelos/platos');

const sequelize = new Sequelize('ebsmock', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const Plato = Platos(sequelize, Sequelize);

sequelize.sync({ force: false })
.then(() => {
    console.log('Tabla sincronizada');
})

module.exports = {
    Plato
}