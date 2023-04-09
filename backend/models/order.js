const mongoose = require("mongoose");

const orderShema = mongoose.Schema({
    qty: Number,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        },
    annonceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Annonce"
        },

});

const order = mongoose.model("Order", orderShema);
module.exports = order;