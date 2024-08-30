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
    res.json(allOrders);
    console.dir(
      allOrders.map((el) => el.get({ plain: true })),
      {
        depth: null,
      }
    );
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

router.put('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log({ id, status });
    const ubdate = await Order.update({ status }, { where: { id } });
    console.log('изменения произведены', ubdate);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const carts = await Cart.findAll({ where: {user_id: req.params.id},
      include: [{ model: Order}],
    });
    res.json(carts)
    console.log(carts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/withuser/:id', async (req, res) => {
  try {
    const carts = await User.findByPk(req.params.id, {
      include: [{ model: Order, through: {model: Cart}, as: 'ordersInCart' }],
    });
    console.log(carts);
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
