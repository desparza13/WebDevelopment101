"use strict"
const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//POST /admin/products
router.route('/')
    .post((req,res)=>{
        let product = req.body;
        if (product!=undefined){ //Si hay body
            try{
                dataHandler.createProduct(product);
            }catch(e){
                let properties = ['title','description','imageUrl',"unit","stock","pricePerUnit","category"];
                let missingProperties = [];
                for (let i=0; i<properties.length; i++){
                    if(product.hasOwnProperty(properties[i])) continue;
                    else{
                        missingProperties.push(properties[i]);
                    }
                }
                res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
            }
            res.status(201).send("Se creó el producto "+product.title);
        }
        res.status(400).send("El body no puede estar vacio");
    });
//PUT /admin/products/:id
router.route('/:id')
    .put((req,res)=>{
        let id = req.params.id;
        let newProduct = req.body;
        let product = dataHandler.getProductById(id);
        if(product!=undefined){
            if (newProduct!=undefined){ //Si hay body
                try{
                    dataHandler.updateProduct(id,newProduct);
                }catch(e){
                    let properties = ['title','description','imageUrl',"unit","stock","pricePerUnit","category"];
                    let missingProperties = [];
                    for (let i=0; i<properties.length; i++){
                        if(product.hasOwnProperty(properties[i])) continue;
                        else{
                            missingProperties.push(properties[i]);
                        }
                    }
                    res.status(400).send("Faltan las propiedades: "+missingProperties.toString());
                }
                res.status(201).send("Se modificó el producto "+product.title);
            }
            res.status(400).send("Se requiere un body");
        }else{
            res.status(404).send("No existe un producto con el id: "+id);
        }
    })
    .delete((req,res)=>{
        let id = req.params.id;
        let product = dataHandler.getProductById(id);
        if (product!=undefined){
            try{
                dataHandler.deleteProduct(id);
                res.status(200)
                    .type("application/json")
                    .send("El producto " + product._title + "con uuid "+product.uuid+"se elimino");
            }catch(e){
                res.status(404).send("No existe un producto con el id: "+product.uuid);
            }
        }else{
            res.status(404).send("No existe un producto con el id: "+id);
        }
        
    })
module.exports = router;