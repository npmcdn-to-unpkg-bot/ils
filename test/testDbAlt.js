var assert = require("assert")
var mongoose = require("mongoose")
var mockgoose = require("mockgoose")
var product = require("../../src/models/product")

mockgoose(mongoose)
describe("product", function() {
    var testProduct = null

    beforeEach(function(done) {
        mockgoose.reset()
        var ProductModel = mongoose.model("Product")
        var newProduct = new ProductModel({
            ean: "5678987654",
            title: "Test Product",
            description: "A product for testing",
            mainPic: null,
            pics: [],
            tags: ["just", "for", "testing"],
            brand: null
        })

        newProduct.save(function(error, product, numRowsAffected) {
            if (!error) {
                testProduct = product
            }
            done(error)
        })
    })

    afterEach((done)=>{
        mockgoose.reset()
        done()
    })

    describe("validate", function() {
        it("Should return true if the product is valid", function(done) {
            done()
        })
    })

    describe(".getProduct", function() {
        it("should find the test product", function(done) {
            product.getProduct(
                {
                    ean: testProduct.ean
                },
                function(product) {
                    assert.equal(product.ean, testProduct.ean)
                    done()
                },
                function(err) {
                    throw ("Error while gathering product data: " + err)
                }
            )
        })

        it("should find nothing", function(done) {
            product.getProduct(
                {
                    ean: "not a ean"
                },
                function(product) {
                    assert.equal(product, null)
                    done()
                },
                function(err) {
                    throw ("Error while gathering product data: " + err)
                }
            )
        })
    })

    describe(".getProducts", function() {
        it("should find the test product", function(done) {
            product.getProducts(
                {
                    ean: testProduct.ean
                },
                function(products) {
                    assert.equal(products.length, 1)
                    assert.equal(products[ 0 ].ean, testProduct.ean)
                    done()
                },
                function(err) {
                    throw ("Error while gathering product data: " + err)
                }
            )
        })

        it("should find nothing", function(done) {
            product.getProducts(
                {
                    ean: "not a ean"
                },
                function(products) {
                    assert.equal(products.length, 0)
                    done()
                },
                function(err) {
                    throw ("Error while gathering product data: " + err)
                }
            )
        })
    })

    describe(".saveProduct", function() {
        it("should save a product", function(done) {
            var attrs = {
                ean: "4567898765434567876543",
                title: "another Test Product",
                description: "Another product for testing",
                tags: ["just", "for", "testing"]
            }

            product.saveProduct(
               attrs,
               function(newProduct) {
                   assert.equal(newProduct.ean, attrs.ean)
                   done()
               },
               function(err) {
                   throw ("Error while gathering product data: " + err)
               }
           )
        })

        it("should update the test product", function(done) {
            testProduct.description = "my hands are typing something..."

            product.saveProduct(
               testProduct,
               function(newProduct) {
                   assert.equal(testProduct.description, newProduct.description)
                   assert.equal(testProduct.ean, newProduct.ean)

                   product.getProducts(
                       {
                           ean: testProduct.ean
                       },
                       function(storedProducts) {
                           assert.equal(testProduct.description, storedProducts[ 0 ].description)
                           assert.equal(testProduct.ean, storedProducts[ 0 ].ean)
                           done()
                       },
                       function(err) {
                           throw ("Error while gathering product data: " + err)
                       }
                   )
               },
               function(err) {
                   throw ("Error while gathering product data: " + err)
               }
           )
        })

        it("should also update the test product", function(done) {
            var attrs = {
                _id: testProduct._id,
                ean: testProduct.ean,
                title: testProduct.title,
                description: "A product for testing",
                tags: testProduct.tags
            }

            product.saveProduct(
                attrs,
                function(newProduct) {
                    assert.equal(testProduct.description, newProduct.description)
                    assert.equal(testProduct.ean, newProduct.ean)

                    product.getProducts(
                        {
                            ean: testProduct.ean
                        },
                        function(storedProducts) {
                            assert.equal(storedProducts.length, 1)
                            assert.equal(testProduct.description, storedProducts[ 0 ].description)
                            assert.equal(testProduct.ean, storedProducts[ 0 ].ean)
                            done()
                        },
                        function(err) {
                            throw ("Error while gathering product data: " + err)
                        }
                    )
                },
                function(err) {
                    throw ("Error while gathering product data: " + err)
                }
            )
        })
    })
})
