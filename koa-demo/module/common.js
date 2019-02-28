exports.getPostData = function(ctx){
	// 获取数据 异步
	return new Promise((resolve,reject)=>{
		try{
			let str = '';
			ctx.req.on('data',function(data){
				str+= data;
			})

			ctx.req.on('end',function(data){
				resolve(str);
			})
		}catch(err){
			reject(err);
		}
	});
}