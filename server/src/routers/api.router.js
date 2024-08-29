const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const profilesettingsrouter = require('./ProfileSettings.router')
const ordersrouter = require('./orders.api.router')


router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);
router.use('/ProfileSettingsPage', profilesettingsrouter);
router.use('/orders', ordersrouter);


module.exports = router;
