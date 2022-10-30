"use strict"

const express = require('express');
const router = express.Router();
const adminProductRouter = require('../routes/admin_products');
const products = require('../routes/products');
router.use('/admin/products', validateAdmin, adminProductRouter);
router.use('/products',products);

//Prueba inicial
router.get('/',(req,res)=>{
    res.send('e-commerce practica3');
})

function validateAdmin(req,res,next){
    let adminToken = req.get('x-auth');
    if(adminToken == undefined || adminToken != 'admin'){
        res.status(403).send("Acceso como administrador no autorizado")
    }
    next();
}

module.exports = router;