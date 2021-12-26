// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import Controller
var contactController = require('./../Controller/ContactController');
var categorieController = require('./../Controller/CategorieController');

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Categorie routes
router.route('/categories')
    .get(categorieController.index)
    .post(categorieController.new);
router.route('/categories/:categorie_id')
    .get(categorieController.view)
    .patch(categorieController.update)
    .put(categorieController.update)
    .delete(categorieController.delete);

// Export API routes
module.exports = router;