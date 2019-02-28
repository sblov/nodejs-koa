const Koa = require("koa"),
	  router = require("koa-router")(),
	  views = require("koa-views"),
	  static = require("koa-static");
	  

var app = new Koa();


app.use(views('views',{
	extension: 'ejs'	
}));

//静态web服务中间件
//可配置多个
app.use(static('./static'));

app.use(static('./public'));

router.get('/',async function(ctx){
	await ctx.render('main');
	
})



app.use(router.routes())	
   .use(router.allowedMethods());	

app.listen(8080);