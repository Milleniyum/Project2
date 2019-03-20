var db = require("../models");
var fs = require("fs");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Load sign-in page
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/index");
        };
        res.sendFile(path.join(__dirname, "../public/html/sign-in.html"));
    });

    app.get("/registration", function(req, res) {
        if (req.user) {
            res.redirect("/index");
        };
        res.sendFile(path.join(__dirname, "../public/html/registration.html"));
    });

    app.get("/index", isAuthenticated, function(req, res) {
        res.render("index");
    });

    app.get("/barcode", isAuthenticated, function(req, res) {
        var userId = req.user.id;
        if (req.query.barcode) {
            db.Barcode.findOne({
                where: { barcode_num: req.query.barcode, userId: 1 }
            }).then(function(result) {
                if (result) {
                    return res.render("scanned", { data: result });
                } else {
                    return res.render("404");
                }
            });
        } else {
            res.render("404");
        }
    });

    app.get("/barcodes/user", function(req, res) {
        var userId = req.user.id;

        db.Barcode.findAll({
            where: { UserId: userId },
            order: [
                ['id', 'DESC']
            ]
        }).then(function(result) {
            res.render("barcodes", { barcodes: result });
        });
    });

    app.get("/inventory/user", function(req, res) {
        var userId = req.user.id;

        db.Item.findAll({
            where: { UserId: userId },
            include: [db.Barcode],
            order: [
                ['item_name', 'ASC']
            ]
        }).then(function(result) {
            res.render("inventory", { items: result });
        });
    });

    app.get("/camera", function(req, res) {
        res.render("camera");
    })

    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/registration.html"));
    });
};