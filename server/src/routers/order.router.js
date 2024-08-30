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
  // try {
  //   const allOrders = await Order.findAll({
  //     attributes: [
  //       'id',
  //       'old_order_price',
  //       'new_order_price',
  //       'discount',
  //       'user_id',
  //       'status',
  //       'delivery_address',
  //       'coordinates',
  //     ],
  //     include: [
  //       {
  //         model: Product,
  //         through: ProductBundle,
  //       },
  //     ],
  //   });
  //   res.json(allOrders);
  // } catch (error) {
  //   res.sendStatus(400);
  //   console.log(error);
  // }
  res.send()
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
    // console.log('============================================')
    // console.log('carts > ', carts.map((el) => el.get()), '\n < carts')
    // console.log('============================================')
    // console.log('carts.Orders > ', carts.map((el) => el.get().Order), '\n < carts.Orders');
    // console.log('============================================')
    // console.log('carts.Order.Products.dataValues')
    // console.dir(carts.map((el) => el.get().Order.Products.dataValues));
    // console.log('============================================')
    // console.log('carts.length', carts.length);
    // console.log('============================================')
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
              // through: {model: ProductBundle},
              required: false,
              model: Product,
            },
          ],
        },
      ],
    });

    // const {ordersInCart} = user;
    // console.log('============================================')
    // console.log('user >', user)
    // console.log('============================================')
    // console.log('ordersInCart > ', ordersInCart, '\n < ordersInCart')
    // console.log('============================================')
    // console.log('ordersInCart.Products > ', ordersInCart.map((el) => el.Products), '\n < ordersInCart.Products');
    // console.log('============================================')
    // console.log('ordersInCart.length', ordersInCart.length);
    // console.log('============================================')
    
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


router.get('/kek', async (req,res) => {
  try {
    const pr = await Product.findAll()
    console.log(pr)
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
