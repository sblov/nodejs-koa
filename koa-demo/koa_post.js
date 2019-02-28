const Koa = require("koa"),
	  router = require("koa-router")(),
	  views = require("koa-views"),
	  bodyparser = require("koa-bodyparser"),
	  common = require('./module/common.js');//原生post

var app = new Koa();


app.use(views('views',{
	extension: 'ejs'	
}));
//使用bodyparser中间件
app.use(bodyparser());

router.get('/',async function(ctx){
	await ctx.render('add');
	
})

router.post('/doadd',async (ctx)=>{
	/*
	var data = await common.getPostData(ctx);	//原生
	console.log(data);
	ctx.body = data;	//username=lov&password=123
	*/
	ctx.body = ctx.request.body;	//{"username":"lov","password":"123"}
})


app.use(router.routes())	
   .use(router.allowedMethods());	

app.listen(8080);