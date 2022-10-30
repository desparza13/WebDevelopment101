"use strict";

class ProductException{
    constructor(errorMessage){
        this.errorMessage=errorMessage;
    }
}
class Product{
    constructor(title, description, imageUrl, unit, stock, pricePerUnit, category){
        this._uuid = generateUUID(); //para que no se lance la excepcion al autogenerarlo ponemos el _,asi no lo detecta el set
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }

    //getters
    get uuid(){
        return this._uuid;
    }
    get title(){
        return this._title;
    }
    get description(){
        return this._description;
    }
    get imageUrl(){
        return this._imageUrl;
    }
    get unit(){
        return this._unit;
    }
    get stock(){
        return this._stock;
    }
    get pricePerUnit(){
        return this._pricePerUnit;
    }
    get category(){
        return this._category;
    }

    //setters
    set uuid(value){
        throw new ProductException("Product's UUIDs are auto generated");
    }
    set title(value){
        if(typeof value!='string'){
            throw new ProductException("Product's title has to be a string");
        }
        else if(value===''){
            throw new ProductException("Product's title can't be empty");
        }
        this._title=value;
    }
    set description(value){
        if(typeof value!=='string'){
            throw new ProductException("Product's description has to be a string");
        }
        else if(value===''){
            throw new ProductException("Product's description can't be empty");
        }
        this._description=value;
    }
    set imageUrl(value){
        if(typeof value!=='string'){
            throw new ProductException("Product's image has to be a string");
        }
        if(value==''){
            throw new ProductException("Product's imageUrl can't be empty");
        }
        this._imageUrl=value;
    }
    set unit(value){
        if(typeof value!=='string'){
            throw new ProductException("Product's unit has to be a string");
        }
        else if(value===''){
            throw new ProductException("Product's unit can't be empty");
        }
        this._unit=value;
    }
    set stock(value){
        if(!Number.isInteger(value)){
            throw new ProductException("Product's stock must be an integer");
        }else if(value<0){
            throw new ProductException("Product's stock can't be negative");
        }
        this._stock=value;
    }
    set pricePerUnit(value){
        if (typeof value=='string'){
            throw new ProductException("Product's price per unit can't be a string");
        }
        if(value<0){
            throw new ProductException("Product's price per unit can't be negative");
        }
        this._pricePerUnit=value;
    }
    set category(value){
        if(typeof value!=='string'){
            throw new ProductException("Product's category has to be a string");
        }
        if(value===''){
            throw new ProductException("Product's category can't be empty");
        }
        this._category=value;
    }

    //funciones estáticas
    static createFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return Product.createFromObject(obj);
    }
    static createFromObject(obj){
        let newProduct = {};
        Object.assign(newProduct, obj); //This will clone original object, but also handle possible non-object values
        //Convert from newProduct to Product instance
        newProduct = Product.cleanObject(newProduct);
        let product
        if(newProduct.title){
            product = new Product(newProduct.title, newProduct.description, newProduct.imageUrl, newProduct.unit, newProduct.stock, newProduct.pricePerUnit, newProduct.category);
        }else{
            product = new Product(newProduct._title, newProduct._description, newProduct._imageUrl, newProduct._unit, newProduct._stock, newProduct._pricePerUnit, newProduct._category);
        }
        return product;
    }
    static cleanObject(obj){
        //Verify that we only contain the desired properties
        let properties = ['title','description','imageUrl',"unit","stock","pricePerUnit","category",'_title','_description','_imageUrl',"_unit","_stock","_pricePerUnit","_category"];
        for (let prop in obj){
            if(properties.includes(prop)) continue;
            delete obj[prop];
        }
        return obj;
    }
}