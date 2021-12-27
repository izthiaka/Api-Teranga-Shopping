var mongoose = require('mongoose');
// Import the slug package
const slug = require('mongoose-slug-generator');
    mongoose.plugin(slug);

// Setup schema
var sousCategorieSchema = mongoose.Schema({
    nom_sous_categorie: {
        type: String,
        unique: true,
        required: true
    },
    slug_categorie: {
        type: String,
        slug: "nom_sous_categorie",
        unique: true
    },
    photo_sous_categorie: String,
});
sousCategorieSchema.set('timestamps', true);

// Export Categorie model
var SousCategorie = module.exports = mongoose.model('sous_categorie', sousCategorieSchema);
module.exports.get = function (callback, limit) {
    SousCategorie.find(callback).limit(limit);
}