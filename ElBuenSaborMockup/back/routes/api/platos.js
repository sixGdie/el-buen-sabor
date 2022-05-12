const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Plato } = require('../../db');

router.get('/', async (req, res) => {
    const platos = await Plato.findAll();
    res.json(platos);
});

router.get('/:id', async (req, res) => {
    const plato = await Plato.findByPk(req.params.id);
    res.json(plato);
});

router.get('/busqueda/:nombre', async (req, res) => {
    const plato = await Plato.findAll({
        where: {
            nombre: {
                [Op.like]: `%${req.params.nombre}%`
            }
        }
    });
    res.json(plato);
});

router.post('/', async (req, res) => {
    const plato = await Plato.create(req.body);
    res.json(plato);
});

router.put('/:id', async (req, res) => {
    await Plato.update(req.body, {
        where: { id: req.params.id }
        });
    res.json({success: 'Plato actualizado'});
});

router.delete('/:id', async (req, res) => {
    await Plato.destroy({
        where: { id: req.params.id }
        });
    res.json({success: 'Plato eliminado'});
});

module.exports = router;