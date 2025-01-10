const router = require('express').Router();
const {getAll,latestStat,deviation}=require('../controlers/CryptoControlers')

router.get('/getAll',getAll)
router.get('/stat',latestStat)
router.get('/deviation',deviation)
module.exports=router