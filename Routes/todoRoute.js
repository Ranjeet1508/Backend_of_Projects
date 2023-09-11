const {Router} = require("express");
const todoRouter = Router();
const { TodoModel } = require("../Model/todoModel")
const { authentication } = require('../Authentication/authencation')


todoRouter.get('/', authentication, async(req,res) => {
    const todo = await TodoModel.find({"userID": req.userID})
    res.send(todo);
})

todoRouter.post('/add', authentication, async(req,res) => {
    const {title,status} = req.body;
    const userID = req.userID;

    const new_task = await new TodoModel({
        title,
        status,
        userID: userID
    })
    new_task.save();
    res.send("task added successfully");
})

todoRouter.put('/update/:id', authentication, async(req,res) => {
    const {id} = req.params;
    const updated_data = req.body
    await TodoModel.findOneAndUpdate({"_id":id, "userID": req.userID}, updated_data)
    res.send({msg: "data updated successfully"});
})

todoRouter.delete('/delete/:id', authentication, async(req,res) => {
    const {id} = req.params;
    await TodoModel.findOneAndDelete({"_id":id , "userID": req.userID});
    res.send({msg: "data deleted successfully"})
})



module.exports = {
    todoRouter
}