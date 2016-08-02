"use strict"
var mongoose = require('mongoose');

var initConnection = (connectionString)=>{
    mongoose.connect(connectionString)
    let db = mongoose.connection
    db.on('error', function(err) {
        console.error('mongo connection error: ', err)
    })
    db.once('open', function() {
        console.info('mongo connection open')
    })
};

let initSchemas = ()=>{
    const Schema = mongoose.Schema
    let draftSchema = new Schema({
        dePart: String,
        enPart: String,
        created: {type: Date, default: Date.now()}
    })

    var userSchema = new Schema({
        email: String,
        password: String,
        salt: String,
        created: {type: Date, default: Date.now()},
        blocked: {type: Boolean, default: false},
        emailVerified: {type: Boolean, default: false},
        role: {type: String, default: 'user'},
        shops: [{
            name: String,
            id: {type: Schema.Types.ObjectId, ref: 'Shop'}
        }],
        brands: [{
            name: String,
            id: {type: Schema.Types.ObjectId, ref: 'Brand'}
        }],
        apiKey: String,
        termsAccepted: Boolean,
        profile: {}
    }, {minimize: false});

    var brandSchema = new Schema({
        name: String,
        description: String,
        gln: String,
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
        logo: {type: Schema.Types.ObjectId, ref: 'Image'},
        contact: {
            name: String,
            email: String,
            phone: String,
            website: String
        },
        images: [{type: Schema.Types.ObjectId, ref: 'PromoImage'}],
        created: {type: Date, default: Date.now()}
    });
    brandSchema.virtual('logoUrl').get(function() {
        return 'http:/images/' + this.logo;
    });
    brandSchema.set('toJSON', {getters: true, virtuals: true});

    var productSchema = new Schema({
        ean: String,
        title: String,
        description: String,
        mainPic: Schema.Types.ObjectId,
        pics: [Schema.Types.ObjectId],
        tags: [String],
        brand: Schema.Types.ObjectId,
        additionals: {}
    }, {minimize: false});

    var imageSchema = new Schema({
        container: String,
        created: {type: Date, default: Date.now()},
        original: {
            name: String,
            extension: String,
            width: String,
            height: String
        },
        large: {
            name: String,
            extension: String,
            width: String,
            height: String
        },
        medium: {
            name: String,
            extension: String,
            width: String,
            height: String
        },
        small: {
            name: String,
            extension: String,
            width: String,
            height: String
        }
    })

    var outfitSchema = new Schema({
        name: String,
        description: String,
        image: {type: Schema.Types.ObjectId, ref: 'Image'},
        creator: {type: Schema.Types.ObjectId, ref: 'User'},
        products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
        tags: [String],
        creatorHomepage: String
    });

    mongoose.model('Draft', draftSchema)
}

let init = (connectionString)=>{
    initConnection(connectionString)
    initSchemas()
}

module.exports.init = init
