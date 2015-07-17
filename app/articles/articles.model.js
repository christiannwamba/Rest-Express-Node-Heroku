//Require mongoose package
var mongoose = require('mongoose');

//Initialize Schema
var Schema = mongoose.Schema;

//Create the Article Schema Instance
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
});

//Create a model from the proposed schema
var ArticleModel = mongoose.model('Article', ArticleSchema);
module.exports = ArticleModel;