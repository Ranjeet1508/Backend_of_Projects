const {Router} = require("express");
const productRouter = Router();
const {ProductModel} = require("../Model/productModel")


productRouter.get("/", async(req,res) => {
    try {
        const {q,filterByCategory,sortBy,page,perpage} = req.query;
        const query = {}

        if(q){
            query.name = {$regex: q, $options:'i'};
        }

        if(filterByCategory){
            query.category = {$eq: filterByCategory}
        }

        const sortOption = {};
        if(sortBy){
            sortOption[sortBy] = 1;
        }
        const limit = +(perpage);

        const product = await ProductModel.find(query).sort(sortOption).limit(limit);
        res.send(product)
    } catch (error) {
        return res.send({msg: "Something went wrong " , error})
    }
})


productRouter.post("/add", async(req,res) => {
    const {name,description,category,imageurl,location,date,price} = req.body;
    const new_product = await new ProductModel({
        name,
        description,
        category,
        imageurl,
        location,
        date,
        price
    })
    new_product.save();
    res.send("product added successfully");
})


productRouter.put("/update/:id", async(req,res) => {
    const {id} = req.params;
    const updatedData = req.body;
    await ProductModel.findOneAndUpdate({"_id":id},updatedData)
    res.send("product updated successfully");
})

productRouter.put("/delete/:id", async(req,res) => {
    const {id} = req.params;
    const updatedData = req.body;
    await ProductModel.findOneAndDelete({"_id":id})
    res.send("product deleted successfully");
})



module.exports = {
    productRouter
}