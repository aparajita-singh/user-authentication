const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'technicalTask1';
const client = new MongoClient(url);
let db = undefined;

const getDb = function () {
    client.connect(function (err) {
        if (err) {
            console.log('error: ' + JSON.stringify(err));
        } else {
            db = client.db(dbName);
            console.log('connected to mongo server ' + url + ' ' + dbName + ' db');
        }
    }, {
        useNewUrlParser: true,
        server: {
            reconnectTries: Number.MAX_SAFE_INTEGER,
            reconnectInterval: 1000
        }
    });
};

const getData = function (query, callback) {
    if (!db) {
        getDb();
    }
    console.log(JSON.stringify(query));
    db.collection('userMedia').find(query).toArray(function (err, docs) {
        callback(err, docs);
    });
};

module.exports = {
    getDb: getDb(),
    getData: getData
};