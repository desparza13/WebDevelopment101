"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

//GET /products
router.route('/')
    .get((req,res)=> {
        let query = req.query.filter;
        let products;
        if(query == undefined){
            try{
                products = res.json(dataHandler.getProducts());
            } catch (e) {
                res.status(400)
                .type("text/plain")
                .send("Error al recuperar objetos")
            }
            //Regresar los productosy status 200
            res.status(200).json(products);    
        }else{
            //Filtrar productos
            //Query no implementado en Practica 2
        }
    })

//GET /products/:id
router.route('/:id')
    .get((req,res)=>{
        let uuid = req.params.id; //El id se recibe como parametro
        let product = dataHandler.getProductById(uuid);

        if(product!=undefined){
            try{
                //Guardar el producto
                product = res.json(dataHandler.getProductById(uuid));
            } catch (e) {
                //Error al obtener
                res.status(400).send("Error");
            }
            res.status(200).send(product);
        }else{
            //ID no coincide
            res.status(404)
            .type("text/plain")
            .send("No hay producto con ID " + uuid)
        }

        res.json();
    })

//POST /products/cart
router.route('/cart')
    .post((req,res)=>{
        let proxies = req.body;
        let products = [];
        if(!Array.isArray(proxies)){
            res.status(400).send("El body debe ser un arreglo");
        }
        for(let proxy of proxies){
            let product; //product by id => usar DataHandler
            //Obtener el producto a través del id con DataHandler
            let proxyUuid=proxy.productUuid;
            product=dataHandler.getProductById(proxyUuid);
            if(product != undefined){
                products.push(product);
            }else{
                res.status(404)
                    .type("text/plain")
                    .send("No hay procudcto con ID "+proxy.productUuid)
            }
        }
        res.status(200).json(products).send("Añadido");

    });

module.exports = router;