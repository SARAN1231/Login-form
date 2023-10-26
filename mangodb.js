// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err.message));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/loginform');
  
}

const loginschema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})


module.exports = mongoose.model("User", loginschema)