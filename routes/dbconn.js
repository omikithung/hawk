
var mysql = require('mysql');

var mysqlConn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kyongjoel1995',
    database : 'dragon'
});
mysqlConn.connect((err)=>{
    if(err) throw err;
    console.log('mysql connected');
});
  
global.db = mysqlConn;
module.exports = mysqlConn;
