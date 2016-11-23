/**
 * Created by user on 18.11.16.
 */

var express = require('express');
var app = express();

app.get('/', (req, res) => res.send('We are start'));

app.listen(8888, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.log('Listening on port 8888!');
	}
});