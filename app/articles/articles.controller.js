//Initialize important variables
var mongoose = require('mongoose'),
    Article = require('./articles.model'),
    _ = require('lodash'),
    errorHandler = require('../core/errors.controller');

//Create method
exports.create = function (req, res) {
    var article = new Article(req.body);

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};



//List all Articles
exports.list = function (req, res) {
    Article.find().sort('-created').exec(function (err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};


// Show the single article

exports.read = function (req, res) {
    res.json(req.article);
};

//Update an article
exports.update = function (req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

//Remove an article
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};



exports.articleByID = function (req, res, next, id) {
    Article.findById(id).exec(function (err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};