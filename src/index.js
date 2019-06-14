const dbConnection = require('./db')
const configs = require('./config')

const app = require('./app')

app.listen(configs.PORT, () => console.log('Server started at http://localhost:9000'));   