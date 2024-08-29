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

router.put('/', verifyAccessToken, (req, res) => {
  try {
    const { id, status } = req.body;
    console.log('dddddd',{ id, status });
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
              through: ProductBundle,
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
    const carts = await User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          through: { model: Cart },
          as: 'ordersInCart',
        },
      ],
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
