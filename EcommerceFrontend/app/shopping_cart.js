"use strict";

class ShoppingCartException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}
class ProductProxy{
    constructor(productUuid, amount){
        this.productUuid = productUuid;
        this.amount = amount;
    }
}
class ShoppingCart{
    constructor(){
        this.products = getProducts();
        this.productProxies = [];
    }

    get products(){
        return this._products;
    }
    set products(value){
        this._products = [];
        if (typeof value=='string'){
            value = JSON.parse(value);
            this._products.push(Product.createFromObject(value));
        }
        if(Array.isArray(value)){
            for(let i=0;i<value.length;i++){
                let product = Product.createFromObject(value[i])
                this._products.push(Product.createFromObject(value[i]));
            }
        }
        else{
            this._products.push(Product.createFromObject(value));
        }
    }
    addItem(productUuid, amount){
        if (amount==0) return;
        if (amount<0){
            throw new ShoppingCartException("You can´t shop a negative amount");
        }
        const searchIndex = this.productProxies.findIndex((ProductProxy) => ProductProxy.productUuid==productUuid);
        if (searchIndex!=-1){
            this.updateItem(productUuid,amount);
        }else{
            let productProxy = new ProductProxy(productUuid,amount);
            this.productProxies.push(productProxy);
        }
    }
    updateItem(productUuid, newAmount){
        if (newAmount<0){
            throw new ShoppingCartException("You can´t shop a negative amount");
        }
        const searchIndex = this.productProxies.findIndex((ProductProxy) => ProductProxy.productUuid==productUuid);
        if (searchIndex!=-1){
            this.productProxies[searchIndex].amount=newAmount;
        }else{
            throw new ShoppingCartException("Can't update a nonexisting product proxy");
        }
    }
    removeItem(productUuid){
        const searchIndex = this.productProxies.findIndex((ProductProxy) => ProductProxy.productUuid==productUuid);
        if (searchIndex!=-1){
            this.productProxies.splice(searchIndex,1);
        }else{
            throw new ShoppingCartException("Can't remove a nonexisting product proxy");
        }
    }
    calculateTotal(){
        let total=0;
        for (let i=0; i<this.productProxies.length; i++){
            total+=getProductById(this.productProxies[i].productUuid)._pricePerUnit*this.productProxies[i].amount
        }
        return total
    }
}