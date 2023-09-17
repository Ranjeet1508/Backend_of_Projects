const {Router} = require("express");
const latinamericaRouter = Router();
const {LatinAmericaModel} = require("../Model/latinamericaModel")
const {authentication} = require('../Authentication/authencation')


latinamericaRouter.get("/", authentication, async(req,res) => {
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

        const product = await LatinAmericaModel.find(query).sort(sortOption).limit(limit);
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})

latinamericaRouter.get("/:_id", authentication, async(req,res) => {
    const {_id} = req.params;
try {
    const product = await LatinAmericaModel.findById(_id)
    res.send(product)
} catch (error) {
    return res.send({msg: "Something went wrong " , error})
}
})


module.exports = {
    latinamericaRouter
}