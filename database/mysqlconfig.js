const mysql = require('mysql');





const connectionmysql = mysql.createConnection({
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: '',
            database: 'restserverclass'
        });

        connectionmysql.connect((err) => {
            if (err) {
                console.log("mi error======"+err);
            } else {
                console.log('Database is connected');
                
            }
        });

   


module.exports =
    connectionmysql
