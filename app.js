console.time("服务器启动耗时");
var express = require('express');
var app = express();
var request = require('request');
var getGetBody = require('./get.js');
var getUpdateBody = require('./update.js');

var headers = {
	'Host': 'wxwyjh.chiji-h5.com',
	'Content-Type': 'application/x-www-form-urlencoded',
	'referer': 'https://servicewechat.com/wxa2c324b63b2a9e5e/44/page-frame.html',
	'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302 MicroMessenger/7.0.1(0x17000120) NetType/WIFI Language/zh_CN',
	'Connection': 'Keep-Alive'
}


app.get('/', function(req, res) {
	if (req.query.record) {
		id = req.query.id;
		request.post({
			url: 'https://wxwyjh.chiji-h5.com/api/archive/get',   // 请求的URL
			headers: headers,
			body: JSON.stringify(getGetBody(id))
		}, function(err, response, body) {
			var record = JSON.parse(req.query.record);

			request.post({
				url: 'https://wxwyjh.chiji-h5.com/api/archive/upload',
				headers: headers,
				body: JSON.stringify(getUpdateBody(id, record))
			}, function(err, response, body) {
				if (JSON.parse(body).code == 0) {
					res.send("成功");
				} else {
					res.send("失败");
				}
			})
		});
	} else if (req.query.id) {
		id = req.query.id;
		request.post({
			url: 'https://wxwyjh.chiji-h5.com/api/archive/get',   // 请求的URL
			headers: headers,
			body: JSON.stringify(getGetBody(id))
		}, function(err, response, body) {
			var record = JSON.parse(JSON.parse(body).data.record);
			res.send('<form>id: <input type="text" name="id" style="width: 200px" value="' + id + '"><br>record <textarea name="record" cols="100" rows = "10">' + JSON.stringify(record) + '</textarea><input type="submit" name="">	</form>');
		});
	} else res.sendFile(__dirname + '/get.html');
	
});

app.get('/update', function(req, res) {
	if (req.query.id) {
			
	} else res.sendFile(__dirname + "/update.html");
	
})

app.listen(6423, function() {
	console.timeEnd("服务器启动耗时");
});