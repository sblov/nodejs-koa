const MongoClient = require('mongodb').MongoClient;

const Config = require('./db.js');

const ObjectID = MongoDB.ObjectID;

//DB类
class DB{
	//单例
	static getInstance(){
		if (!DB.instance) {
			DB.instance =  new DB();
		}

		return DB.instance;
	}

	constructor(){
		this.dbClient = ''; 
		this.connect(); //实例化时连接数据库
	}

	//连接数据库
	connect(){
		let _that = this;

		//返回promise
		return new Promise((resolve,reject)=>{
			if(!_that.dbClient){
				//第一次建立连接
				MongoClient.connect(Config.url, {useNewUrlParser:true},(err,client)=>{
					if (err){
						reject(err);
						
					} else{

						_that.dbClient = client.db(Config.dbName);
						//db
						resolve(_that.dbClient);

						
					}
				});
			}else {
				
				resolve(_that.dbClient);
			}
			
			

		});

	}

	find(collectionName,json){
		return new Promise((resolve,reject)=>{
			this.connect().then((db)=>{
				// console.log(db);
				var result = db.collection(collectionName).find(json);

				result.toArray((err,docs)=>{
					if (err) {
						reject(err);
						return;
					}
					resolve(docs);
				});
			});
		});
	}
	insert(collectionName,json){
		return new Promise((resolve,reject)=>{

			this.connect().then((db)=>{
				db.collection(collectionName).insertOne(json,(err,result)=>{

					if (err) {
						reject(err);
					}else {
						resolve(result);
					}

				});
			});

		});
	}
	update(collectionName,json1,json2){
		return new Promise((resolve,reject)=>{
			this.connect().then((db)=>{
				db.collection(collectionName).updateOne(json1,{
					$set:json2
				},(err,result)=>{
					if (err) {
						reject(err);
					}else {
						resolve(result);
					}
				})
			});
		});
	}
	remove(collectionName,json){
		return new Promise((resolve,reject)=>{

			this.connect().then((db)=>{
				db.collection(collectionName).removeOne(json,(err,result)=>{

					if (err) {
						reject(err);
					}else {
						resolve(result);
					}

				});
			});

		});
	}
	getObjectId(id){
		return new ObjectID(id);
	}
}
//测试
/*DB.getInstance().find("students",{}).then((data)=>{
	console.log(data);
});
*/

module.exports = DB.getInstance();