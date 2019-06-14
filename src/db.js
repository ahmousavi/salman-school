const mongoose = require('mongoose')
const { DATABASE_URL } = require('./config')

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