import ErrorHandler from "../middlewares/error.js";
import { Tasks } from "../models/tasks.js";

export const newTask = async (req,res) => {
    const {title,description} = req.body;

    const tasks = await Tasks.findById(req.user);
    //console.log(tasks);

    if(!tasks){
        var myObj = [{
            title,
            description,
        }]
        await Tasks.create({
            _id: req.user,
            EachTask: myObj
        });
        res.status(201).json({
            success: true,
            message: "First new task added",
        });

    } else {
        var myObj = {
            title,
            description,
        }
        await Tasks.findOneAndUpdate({_id: req.user},{$push: { EachTask: myObj}},{
            //upsert: true
        });
        res.status(201).json({
            success: true,
            message: `Task added to ${req.user} `,
        });

    }
    

};

export const getMyTasks = async (req,res,next) => {
    //const tasks = await Tasks.find({ user: req.user._id});
    const tasks = await Tasks.findById(req.user);
    //console.log(tasks);

    if(!tasks || tasks.EachTask.length == 0)
        return next(new ErrorHandler(`Error:No task found for user ${req.user}`, 404));
    res.status(200).json({
        status: true,
        //tasks,
        tasks: tasks.EachTask,
    });
    
};

export const ChangeCompletedStatus = async (req,res,next) => {
    const {id,taskCompleted} = req.params;
    const user_id = req.user;

    // const task = await Tasks.findById(id);
    // task.isCompleted = !task.isCompleted;
    // await task.save();

    if (taskCompleted == "yes") {
        const promise = await Tasks.updateOne(
            { '_id': user_id, 'EachTask': { $elemMatch: { '_id': id, 'isCompleted': false } } },
            { $set: { 'EachTask.$.isCompleted': true  } } 
            );
        if (promise.matchedCount == 0)
            return next(new ErrorHandler("Error: Task already marked as completeeeee", 404));
        res.status(200).json({
            status: true,
            message: `task ${id} is marked as completed`
        });
    } else if (taskCompleted == "no") {
        const promise = await Tasks.updateOne(
            { '_id': user_id, 'EachTask': { $elemMatch: { '_id': id, 'isCompleted': true } } },
            { $set: { 'EachTask.$.isCompleted': false  } } 
            );
        if (promise.matchedCount == 0)
            return next(new ErrorHandler("Error: Task already marked as incompleteeeee,", 404));
        res.status(200).json({
            status: true,
            message: `task ${id} is marked as incomplete`
        });      
    }
};

export const DeleteTask = async (req,res,next) => {
    const {id,taskCompleted} = req.params;
    const user_id = req.user;

    const task = await Tasks.findOne({ '_id': user_id, 'EachTask': { $elemMatch: { '_id': id } } });
    //console.log(task);

    if(!task)
       return next(new ErrorHandler(`Error: Task with id ${id} not found`, 404 ));


    //const task = await Tasks.findById(id);

    // if(!task)
    //     return res.status(404).json({
    //         status: false,
    //         message: "invalidID",
    //     });
    //await task.deleteOne();

    await Tasks.updateOne(
        { '_id': user_id, 'EachTask': { $elemMatch: { '_id': id } } },
        { $pull: { 'EachTask': {'_id': id} } });
    res.status(200).json({
        status: true,
        message: `task ${id} is deleted`
    });  

};