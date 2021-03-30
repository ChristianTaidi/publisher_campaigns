const redis = require('redis');
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    password: ''
});

client.on('error',err=>{
    console.log('Error '+ err);
});

class AppDAO{
    
}
module.exports = AppDAO;