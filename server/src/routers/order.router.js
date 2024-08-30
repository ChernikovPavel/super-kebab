const router = require('express').Router();

const { where } = require('sequelize');
const {
  
  Order,
  Product,
  ProductBundle,
  Cart,
  User,
} = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');

router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      attributes: [
        'id',
        'old_order_price',
        'new_order_price',
        'discount',
        'user_id',
        'status',
        'delivery_address',
        'coordinates',
      ],
      include: [
        {
          model: Product,
          through: ProductBundle,
        },
      ],
    });
    res.json(allOrders)
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

router.put('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id, status } = req.body;
    const update = await Order.update({ status }, { where: { id } });
    console.log('изменения произведены', update);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          // required: false,
          model: Order,
          include: [
            {
              required: false,
              through: {model: ProductBundle},
              model: Product,
            },
          ],
        },
      ],
    });
    res.json(carts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/withuser/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          as: 'ordersInCart',
          required: false,
          include: [
            {
              required: false,
              model: Product,
            },
          ],
        },
      ],
    });
  
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;
  try {
    const order = await Order.findOne({ where: { id } });
      order.destroy();
      res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})

router.get('/courier/:id', async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.params.id },
          include: [
            {
              model: Product,
              through: ProductBundle,
            },
          ],
    });
    
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
