var users = require('./users.controller');

module.exports = function (app) {
    //Users Route
    app.route('/users')
        .post(users.authenticate)
};