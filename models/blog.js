const {Schema, model, Mongoose} = require("mongoose");

const blogSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: "user",
    },
}, {timestamps: true});

const blogModel = model('blog', blogSchema);

module.exports = blogModel;