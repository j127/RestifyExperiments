var restify = require("restify");

var server = restify.createServer();

function sendV1(req, res, next) {
    res.send("Saluton: " + req.params.name);
    return next();
}

function sendV2(req, res, next) {
    res.send({ hello: req.params.name });
    return next();
}

// Use Accept-Version
// curl -s -H 'accept-version: ~1' localhost:8080/saluton/Mondo
// curl -s -H 'accept-version: ~2' localhost:8080/saluton/Mondo
var PATH = "/saluton/:name";

server.get({
    path: PATH,
    version: "1.1.3"
}, sendV1);

server.get({
    path: PATH,
    version: "2.0.0"
}, sendV2);

server.listen(8080, function () {
    console.log("%s listening at %s", server.name, server.url);
});
