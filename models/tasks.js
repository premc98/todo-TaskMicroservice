import mongoose from "mongoose";

const mySubSchema = new mongoose.Schema({
    

});

const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    EachTask: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }]
});

export const Tasks = mongoose.model("Tasks", schema);

