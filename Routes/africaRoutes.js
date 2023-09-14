const {Router} = require("express");
const africaRouter = Router();
const {AfricaModel} = require("../Model/africaModel")


africaRouter.get("/", async(req,res) => {
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

        const product = await AfricaModel.find(query).sort(sortOption).limit(limit);
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})




module.exports = {
    africaRouter
}