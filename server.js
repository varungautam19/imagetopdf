var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
