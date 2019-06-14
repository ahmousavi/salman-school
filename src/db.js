const { DATABASE_URL } = require('./config')

// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(DATABASE_URL, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(DATABASE_URL).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the : '+ err)
    }
);
module.exports = mongoose.connection