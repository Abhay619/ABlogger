const {Schema, model, Mongoose} = require("mongoose");

const commentSchema = new Schema ({
    content:{
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectID,
        ref: "blog",
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: "user",
    },
}, {timestamps: true});

const commentModel = model('comment', commentSchema);

module.exports = commentModel;