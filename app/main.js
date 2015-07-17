module.exports = function (app) {
    require('./articles/articles.routes')(app);
    require('./users/users.routes')(app);
};