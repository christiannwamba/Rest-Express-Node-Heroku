//intializing. . .
var articles = require('./articles.controller');
var users = require('../users/users.controller');
var passport = require('passport');
module.exports = function (app) {
    // Article Routes
    app.route('/articles')
        .get(users.verify, articles.list)
        .post(articles.create);

    app.route('/articles/:articleId')
        .get(articles.read)
        .put(articles.update)
        .delete(articles.delete);

    // Finish by binding the article middleware
    app.param('articleId', articles.articleByID);
};