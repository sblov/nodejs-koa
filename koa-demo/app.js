const Koa = require("koa");
const Router = require("koa-router");

var app = new Koa();
var router = new Router();

//配置路由
//中间件
//express写法
// app.use(function(req,res){
// 	res.end(".....");
// });

// app.use(async(ctx) => {
// 	ctx.body = 'hello koa';
// });

//应用级中间件
app.use(async (ctx,next)=>{	//不加路径参数，默认对所有路径使用
	console.log(new Date());
	await next();

	//通过上面的next，先进行路径的路由匹配，再执行以下逻辑
	if(ctx.status == 404){
		ctx.body = "404 PAGE";
	}else {
		console.log(ctx.url);
	}

});

//配置路由
router.get('',function(ctx){
	ctx.body = 'router body';
}).get('/news',async (ctx)=>{

	//获取get传值	
	console.log(ctx.query); // { id: '111', name: 'lov' }
	console.log(ctx.querystring); // id=111&name=lov
	console.log(ctx.url); //  /new?id=111&name=lov
	console.log(ctx.request.url); //  /new?id=111&name=lov
	console.log(ctx.request.query);// { id: '111', name: 'lov' }
	console.log(ctx.request.querystring); // id=111&name=lov
	
	ctx.body = "news body";

}).get('/newscontent/:id',function(ctx){
	//动态路由
	//http://localhost:8080/newscontent/111
	console.log(ctx.params);	// { id: '111' }

	ctx.body = 'newscontent body';
});

//路由级中间件
router.get('/log',function(ctx,next){
	console.log('log  middleware');

	next();
});

router.get('/log',function(ctx){
	ctx.body = 'router body';
});
//启动路由
app.use(router.routes())	//启动路由
   .use(router.allowedMethods());	//在所有路由中间件最后调用，根据ctx.status设置response响应头

app.listen(8080);