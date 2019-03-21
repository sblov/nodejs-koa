const Koa = require("koa"),
	  router = require("koa-router")(),
	  render = require("koa-art-template"),
	  path = require('path');//引入path

//封装
const DB = require('./module/dbconfig.js');

var app = new Koa();

//配置koa-art-template模板引擎
render(app,{
	root: path.join(__dirname,'views'),	//视图的位置
	extname: '.html',	//后缀名
	debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
})

router.get('',async (ctx)=>{
	// ctx.body ="Home Page";

	//mongodb 数据
	let stus = await DB.find("students",{});

	ctx.cookies.set('userinfo','lov',{
		maxAge: 60*1000*60
	});

	//中文转换
	let name = Buffer.from('张三').toString('base64');
	ctx.cookies.set('name',name,{
		maxAge: 60*1000*60
	});

	let list = {
		name: 'lov',
		h3: '<h3>content</h3>',
		num: 20,
		arr: ['aaa','bbb','ccc','ddd'],
		stus: stus
	}
	await ctx.render('index',{
		list: list
	});
});

router.get('/news',async (ctx)=>{
	let userinfo = ctx.cookies.get('userinfo');
	console.log(userinfo);

	//获取中文转换
	let data = ctx.cookies.get('name');
	let name = Buffer.from(data,'base64').toString();
	console.log(name);
	ctx.body = "News Page";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);