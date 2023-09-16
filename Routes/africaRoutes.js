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
            //sortOption = { price: _order === "desc" ? -1 : 1 }
        }
        const limit = +(perpage);

        const product = await AfricaModel.find(query).sort(sortOption).limit(limit);
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})


africaRouter.get("/country/:_id", async(req,res) => {
    try {
        const {_id} = req.params;
        const objectId = mongoose.Types.ObjectId(_id);
        const product = await AfricaModel.findById(objectId)
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})



module.exports = {
    africaRouter
}