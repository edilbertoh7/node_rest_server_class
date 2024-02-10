require('dotenv').config()
const Server = require('./models/Server')
// const app = express()


// app.get('/', function (req, res) {
//   res.send('Hello Worldss')
// })

// app.listen(process.env.PORT,()=>{
//     console.log('servidor corriendo en el puerto ' + 'http://localhost:'+process.env.PORT);
// });

const server = new Server();

server.listen();