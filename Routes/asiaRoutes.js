const {Router} = require("express");
const asiaRouter = Router();
const {AsiaModel} = require("../Model/asiaModel")
const {authentication} = require('../Authentication/authencation');


asiaRouter.get("/", authentication, async(req,res) => {
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

        const product = await AsiaModel.find(query).sort(sortOption).limit(limit);
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})

asiaRouter.get("/:_id", authentication, async(req,res) => {
    const {_id} = req.params;
try {
    const product = await AsiaModel.findById(_id)
    res.send(product)
} catch (error) {
    return res.send({msg: "Something went wrong " , error})
}
})




module.exports = {
    asiaRouter
}