const express=require('express');
const router=express();
const indexController=require('../controllers/indexController');

router.get('/index',indexController.getIndex);
module.exports=router;