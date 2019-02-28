// ejs模板引擎使用
const Koa = require("koa"),
	  router = require("koa-router")(),
	  views = require("koa-views");

var app = new Koa();

//配置模板引擎中间件（第三方中间件）
//app.use(views('views',{map: {html: 'ejs'}}))	//该方式配置时，模板后缀名为html
app.use(views('views',{
	extension: 'ejs'	//应用ejs模板引擎
}));


app.use(async (ctx,next)=>{
	ctx.state.userinfo = 'userinfo-lov';
	await next();
});

app.use(async (ctx,next)=>{	
	console.log(new Date());
	await next();

	if(ctx.status == 404){
		ctx.body = "404 PAGE";
	}else {
		console.log(ctx.url);
	}

});


router.get('/',async function(ctx){

	let title = "Hello ejs";
	let list = ['aaa','bbb','ccc'];
	let content = "<h2>content</h2>";
	let num = 20;

	// 必须使用await，否则为异步执行，会导致找不到路由
	await ctx.render('index',{
		title: title,
		list: list,
		content: content,
		num: num
	});
	// ctx.body = 'router body';
}).get('/news',async (ctx)=>{
	
	ctx.body = "news body";

}).get('/newscontent/:id',function(ctx){
	//动态路由
	//http://localhost:8080/newscontent/111
	console.log(ctx.params);	// { id: '111' }

	ctx.body = 'newscontent body';
});

router.get('/log',function(ctx,next){
	console.log('log  middleware');

	next();
});

router.get('/log',function(ctx){
	ctx.body = 'router body';
});

app.use(router.routes())	
   .use(router.allowedMethods());	

app.listen(8080);