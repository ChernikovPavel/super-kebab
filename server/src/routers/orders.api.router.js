const router = require('express').Router();
const { Order } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');

router
  .get('/', async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findOne({ where: { id } });
      res.json(order);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/', verifyAccessToken, async (req, res) => {
    const {
      old_order_price,
      new_order_price,
      discount,
      delivery_address,
      coordinates,
    } = req.body;
    const { user } = res.locals;

    try {
      const order = await Order.create({
        old_order_price,
        new_order_price,
        discount,
        delivery_address,
        coordinates,
        userId: user.id,
      });
      res.json(order);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;
    try {
      const order = await Order.findOne({ where: { id } });
      if (order.userId === user.id) {
        order.destroy();
        res.sendStatus(200);
      } else {
        res.status(400).json({ message: 'У вас нет прав на удаление' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .put('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const { old_order_price,
        new_order_price,
        discount,
        delivery_address,
        coordinates, } = req.body;
    try {
      const editedOrder = await Order.findByPk(id);
      if (editedOrder) {
        (editedOrder.old_order_price = old_order_price),
          (editedOrder.new_order_price = new_order_price),
          (editedOrder.discount = discount),
          (editedOrder.delivery_address = delivery_address),
          (editedOrder.coordinates = coordinates),
          editedOrder.save();
        res.json(editedOrder);
      } else {
        res.status(400).send('Not found');
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
