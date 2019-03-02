const Koa = require("koa"),
	  router = require("koa-router")(),
	  //1、引入koa-session
	  session = require("koa-session");
	 

var app = new Koa();

//2、配置session中间件
app.keys = ['some secret hurr'];	//cookie的签名 
 	
const CONFIG = {
  key: 'koa: sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true)默认只有服务器可获取*/
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
 
app.use(session(CONFIG, app)); 

router.get('/login',async (ctx)=>{

	ctx.session.userinfo = 'lov';
	ctx.body ="login session";

	
});

router.get('/',async (ctx)=>{

	console.log(ctx.session.userinfo);
	ctx.body ="Home Page";

	
});

router.get('/news',async (ctx)=>{
	console.log(ctx.session.userinfo)
	ctx.body = "News Page";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);