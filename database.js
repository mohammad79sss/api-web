var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost', // Replace with your host name
    user: 'root',      // Replace with your database username
    password: '',      // Replace with your database password
    database: 'my-node' // // Replace with your database Name
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = con;