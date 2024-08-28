const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const profilesettingsrouter = require('./ProfileSettings.router')


router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);
router.use('/ProfileSettingsPage', profilesettingsrouter);


module.exports = router;
