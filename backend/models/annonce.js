const mongoose = require("mongoose");

const annonceShema = mongoose.Schema({
    productName: String,
    category:String,
    price: Number,
    qty:Number,
    description: String,
    date: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
    avatar: String,
});

const annonce = mongoose.model("Annonce",annonceShema);
module.exports = annonce;