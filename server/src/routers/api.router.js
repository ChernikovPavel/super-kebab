const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const orderRouter = require('./order.router');
const profilesettingsrouter = require('./ProfileSettings.router');

router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);
router.use('/order', orderRouter);
router.use('/ProfileSettingsPage', profilesettingsrouter);
router.use('/orders', ordersrouter);


module.exports = router;
