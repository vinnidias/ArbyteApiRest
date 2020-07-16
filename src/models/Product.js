const moment = require('moment')
const utcnow = moment().utc().format()
module.exports = function Product(data){
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.created_at = data.created_at || utcnow
    this.updated_at = data.updated_at || utcnow
}

