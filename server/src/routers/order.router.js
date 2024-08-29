const router = require('express').Router();

const { where } = require('sequelize');
const { Order, Product, ProductBundle } = require('../../db/models');
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

router.put('/', verifyAccessToken, (req,res) => {
  try {
    const {id, status} = req.body
    console.log({id, status})
  } catch (error) {
    console.log(error)
  }
})

// router.get('/', async (req, res) => {
//   try {
//     const arr = await Product.findAll();

//     res.json(arr);
//   } catch (error) {
//     res.sendStatus(400);
//     console.log(error);
//   }
// });
module.exports = router;
