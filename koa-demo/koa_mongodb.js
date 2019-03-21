//基本使用
/*const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'test';
console.time('start');
MongoClient.connect(url,(err,client)=>{
	console.log("Connected Successfully");

	const db = client.db(dbName);

	db.collection('students').findOne({},(err,docs)=>{
		if (!err) {

			console.log(docs);
			client.close();
			console.timeEnd('start');
		}
	});
});*/


//封装
const DB = require('./module/dbconfig.js');

/*DB.find("students",{}).then((data)=>{
	console.log(data[0]);
})

DB.insert("students",{name:"kkk",age:78,gender:"male"}).then((data)=>{
	console.log(data);
});*/
/*DB.update("students",{name:"kkk"},{age:1000}).then((data)=>{
	console.log(data);
});
*/
DB.remove("students",{name:"kkk"}).then((data)=>{
	console.log(data);
});