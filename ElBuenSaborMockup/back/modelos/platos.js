module.exports = (sequelize, type) => {
    return sequelize.define('plato', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        rubro: type.STRING,
        imagen: type.STRING,
        precio: type.DECIMAL(10, 2),
        costoEnvio: type.DECIMAL(10, 2),
        descripcion: type.STRING
    }, {
        timestamps: false
    });
}