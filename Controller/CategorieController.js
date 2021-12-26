// Import Categorie model
Categorie = require('./../Model/CategorieModel');

// Handle index actions
exports.index = function (req, res) {
    Categorie.get(function (err, categories) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Categories retrieved successfully",
            data: categories
        });
    });
};

// Handle create categorie actions
exports.new = function (req, res) {
    var categorie = new Categorie();
    categorie.nom_categorie = req.body.nom_categorie ? req.body.nom_categorie : categorie.nom_categorie;
    categorie.photo_categorie = req.body.photo_categorie;
    // save the categorie and check for errors
    categorie.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New categorie created!',
            data: categorie
        });
    });
};

// Handle view categorie info
exports.view = function (req, res) {
    Categorie.findById(req.params.categorie_id, function (err, categorie) {
        if (err)
            res.send(err);
        res.json({
            message: 'Categorie details loading..',
            data: categorie
        });
    });
};

// Handle update categorie info
exports.update = function (req, res) {
Categorie.findById(req.params.categorie_id, function (err, categorie) {
        if (err)
            res.send(err);
        categorie.nom_categorie = req.body.nom_categorie ? req.body.nom_categorie : categorie.nom_categorie;
        categorie.photo_categorie = req.body.photo_categorie;
        // save the categorie and check for errors
        categorie.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Categorie Info updated',
                data: categorie
            });
        });
    });
};

// Handle delete categorie
exports.delete = function (req, res) {
    Categorie.remove({
        _id: req.params.categorie_id
    }, function (err, categorie) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Categorie deleted'
        });
    });
};