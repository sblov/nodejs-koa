const Koa = require("koa"),
	  router = require("koa-router")(),
	  user = require('./routers/user.js'),
	  admin = require('./routers/admin.js');

var app = new Koa();


router.use('/user',user.routes());
router.use('/admin',admin);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);


