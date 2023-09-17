const {Router} = require("express");
const europeRouter = Router();
const {EuropeModel} = require("../Model/europeModel");
const {authentication} = require('../Authentication/authencation');


europeRouter.get("/", authentication, async(req,res) => {
    try {
        const {q,filterByCategory,sortBy,page,perpage} = req.query;
        const query = {}

        if(q){
            query.title = {$regex: q, $options:'i'};
        }

        if(filterByCategory){
            query.category = {$eq: filterByCategory}
        }

        const sortOption = {};
        if(sortBy){
            sortOption[sortBy] = 1;
        }
        const limit = +(perpage);

        const product = await EuropeModel.find(query).sort(sortOption).limit(limit);
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})

europeRouter.get("/:_id", authentication, async(req,res) => {
    const {_id} = req.params;
try {
    const product = await EuropeModel.findById(_id)
    res.send(product)
} catch (error) {
    return res.send({msg: "Something went wrong " , error})
}
})




module.exports = {
    europeRouter
}