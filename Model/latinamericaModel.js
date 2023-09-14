const mongoose = require("mongoose");

const latinamericaSchema = mongoose.Schema({
    title: {type: String, required:true},
    region: {type: String, required: true},
    category: {type: String, required: true},
    rating: {type: Number, required: true},
    destinations: {type: [String] },
    group_size:{type: Number},
    tour_id:{type: Number},
    reviews:{type: Number},
    tour_length: {type: Number, required:true},
    price_per_day: {type: Number, required:true},
    main_image: {type: String, required:true},
    map_image: {type: String, required:true},
    places_see_img: {type: [String] },
    places_see_name: {type: [String] },
    top_crousel_img: {type: [String] }
})

const LatinAmericaModel = mongoose.model("latinamerica",latinamericaSchema);

module.exports = {
    LatinAmericaModel
}



