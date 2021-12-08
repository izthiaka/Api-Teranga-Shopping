var mongoose = require('mongoose');
// Import the slug package
const slug = require('mongoose-slug-generator');
    mongoose.plugin(slug);

// Setup schema
var categorieSchema = mongoose.Schema({
    nom_categorie: {
        type: String,
        unique: true,
        required: true
    },
    slug_categorie: {
        type: String,
        slug: "nom_categorie",
        unique: true
    },
    photo_categorie: String,
});
categorieSchema.set('timestamps', true);

// Export Categorie model
var Categorie = module.exports = mongoose.model('categorie', categorieSchema);
module.exports.get = function (callback, limit) {
    Categorie.find(callback).limit(limit);
}