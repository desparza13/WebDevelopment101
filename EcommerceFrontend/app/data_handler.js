"use strict";
const products = [];

function getProducts(){
    return products;
}
function getProductById(uuid){
    return products.find((Product)=>Product._uuid==uuid);
}
function createProduct(newProduct){
    products.push(Product.createFromObject(newProduct));
}
function updateProduct(uuid,newProduct){
    const searchIndex = getProducts().findIndex((Product) => Product._uuid==uuid);
    if (searchIndex!=-1){
        products[searchIndex]=Product.createFromObject(newProduct);
    }
}
function deleteProduct(uuid){
    const searchIndex = getProducts().findIndex((Product) => Product._uuid==uuid);
    if (searchIndex!=-1){
        products.splice(searchIndex,1);
    }
}