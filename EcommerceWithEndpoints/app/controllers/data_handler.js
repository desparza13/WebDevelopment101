"use strict";

const fs = require('fs')
const Product = require('./products')

let content = fs.readFileSync('app/data/products.json')
const products = JSON.parse(content).map(Product.createFromObject);

//Productos
function getProducts(){
    return products;
}
function getProductById(uuid){
    return products.find((Product)=>Product._uuid==uuid);
}
function createProduct(newProduct){
    products.push(Product.createFromObject(newProduct));
    console.log(products);
    fs.writeFileSync('./app/data/products.json', JSON.stringify(products));
}
function updateProduct(uuid,newProduct){
    const searchIndex = getProducts().findIndex((Product) => Product._uuid==uuid);
    if (searchIndex!=-1){
        products[searchIndex]=Product.createFromObject(newProduct);
    }
    fs.writeFileSync('./app/data/products.json',JSON.stringify(products));

}
function deleteProduct(uuid){
    const searchIndex = getProducts().findIndex((Product) => Product._uuid==uuid);
    if(searchIndex >=0){
        let deletedProduct= products.splice(searchIndex,1)[0];
        fs.writeFileSync('./app/data/products.json',JSON.stringify(products));
        return deletedProduct;
    }
    else{
        throw new ShoppingCartException("No existe producto con ese ID");
    }
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct; //Admin_products
exports.updateProduct = updateProduct; //admin_products
exports.deleteProduct = deleteProduct; //admin_products
