const  router = require("koa-router")();

router.get('/',(ctx)=>{
	ctx.body = 'User Home Page';
});
router.get('/list',(ctx)=>{
	ctx.body = 'User List Page';
});
router.get('/info',(ctx)=>{
	ctx.body = 'User Info Page';
});

module.exports = router;
