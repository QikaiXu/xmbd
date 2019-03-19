var crypto = require("crypto");

// var id = "oc6rl5SXztqZYj1db-Q0ldq_7Rlk";

function getUpdateBody(id, record) {
	var e = []
	var i = "";
	var t = {
	         plat: 'wx',
	         record: JSON.stringify(record),
	         time: Date.now(),
	         openid: id,
	         wx_appid: 'wxa2c324b63b2a9e5e',
	         wx_secret: '8fbd540d0b23197df1d5095f0d6ee46d'
	}
	for (var s in t) {
		e.push(s);
	}
	e.sort(function(t, e) {
		return t > e ? 1 : t < e ? -1 : 0;
	});
	for (var n in e) {
		i += ( s=e[n]) + "=" + t[s] + "&";
	}
	t.sign = crypto.createHash("md5").update(i.substr(0, i.length-1)).digest("hex");
	return t;
}

module.exports = getUpdateBody;


