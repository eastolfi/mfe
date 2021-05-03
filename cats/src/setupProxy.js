module.exports = (app) => {
    app.use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
}