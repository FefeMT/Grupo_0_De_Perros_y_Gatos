let middleware = (req,res,next) => {
    let ruta = req.path.split("/").pop();
    let style = ruta.length > 1 ? ruta : "home";
    res.locals.style = style;
    return next()
}
module.exports = middleware;