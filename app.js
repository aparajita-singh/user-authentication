const express = require('express');
const app = express();
const dao = require('./dao/mongoDao');

const credentials = require('./utils/credentials');

app.get('/index', (req, res) => {

    dao.getData({'user': req.query.user}, function (err, data) {
        if(err) {
            const errorMessage = 'got error while querying mongo: ' + JSON.stringify(err);
            console.log(errorMessage);
            res.status(500).send('failed\n' + errorMessage);
        } else {
            res.status(200).send('success\n' + JSON.stringify(data, null, 4));
        }
    });
});


app.listen(3000, () => {
    console.log('running server')
});