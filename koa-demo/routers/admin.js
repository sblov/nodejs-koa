const  router = require("koa-router")();

router.get('/',(ctx)=>{
	ctx.body = 'Admin Home Page';
});
router.get('/list',(ctx)=>{
	ctx.body = 'Admin List Page';
});
router.get('/info',(ctx)=>{
	ctx.body = 'Admin Info Page';
});

module.exports = router.routes();