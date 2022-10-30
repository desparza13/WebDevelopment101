"use strict";
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Probar getters y setters para revisar validaciones
console.log("Pruebas products");
let title="Collar"
let description="Collar largo dorado"
let imageUrl="imageUrlHere"
let unit="pieza"
let stock=1
let pricePerUnit=150
let category="Collares"
//TITLE
//title="";
//title=1;
//DESCRIPTION
//description="";
//description=1;
//IMAGEURL
//imageUrl="";
//imageUrl=1;
//UNIT
//unit="";
//unit=2;
//STOCK
//stock="dos";
//stock=-1;
//PRICEPERUNIT
//pricePerUnit="cien";
//pricePerUnit=-1;
//CATEGORY
//category=2;
//category=""
//Producto prueba setters y sus excepciones
let productValidacion = new Product(title, description, imageUrl, unit, stock, pricePerUnit, category);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNCIONES POR PRODUCTO
let productJSON = Product.createFromJson('{"title":"Anillo ajustable", "description":"Anillo de ojo turco","imageUrl":"linkcito","unit":"pieza","stock":5,"pricePerUnit":200,"category":"Anillos"}');
console.log("A partir de JSON",productJSON);
let productObj = Product.createFromObject({'title':"Tobillera", 'description':"Tobillera plata", 'imageUrl':"link", 'unit':"pieza", 'stock':9, 'pricePerUnit':170, 'category':"Tobillera"})
console.log("A partir de objeto",productObj);
let productClean = {'basura':"extra",'title':"Pulsera","masBasura":"asdf", 'description':"Pulsera plata"}
console.log("Objeto antes de limpiar",productClean);
productClean = Product.cleanObject(productClean);
console.log("Objeto después de limpiar",productClean);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//PRUEBAS DATA HANDLER
console.log("Pruebas DataHandler");
//Poblar lista DataHandler
createProduct({'title':"Set collarcitos", 'description':"Chapa de oro 12K", 'imageUrl':"https://i.pinimg.com/474x/da/a3/07/daa307f48cf7550ecf74e5a0cd34bbf2.jpg", 'unit':"Set 3 piezas", 'stock':3, 'pricePerUnit':350.00, 'category':"Collar"});
createProduct({'title':"Set corazón", 'description':"Chapa de oro 12K", 'imageUrl':"https://i.pinimg.com/474x/da/a3/07/daa307f48cf7550ecf74e5a0cd34bbf2.jpg", 'unit':"Set 3 piezas", 'stock':3, 'pricePerUnit':350.00, 'category':"Collar"});
createProduct({'title':"Collar moneda", 'description':"Dorado", 'imageUrl':"https://i.pinimg.com/474x/24/cc/8d/24cc8d74acbe5b69536fdd8e28f466b5.jpg", 'unit':"Pieza", 'stock':5, 'pricePerUnit':150.00, 'category':"Collar"});
createProduct({'title':"Set de anillos", 'description':"7 anillos dorados", 'imageUrl':"https://i.pinimg.com/474x/a4/20/b6/a420b67e7be7595ff2367d7ce2e7a724.jpg", 'unit':"Set 7 piezas", 'stock':6, 'pricePerUnit':300.00, 'category':"Anillo"});
createProduct({'title':"Arracadas aros", 'description':"Chapa de oro 16K", 'imageUrl':"https://i.pinimg.com/474x/b7/47/dd/b747dd066450ed77757c16ade07fade2.jpg", 'unit':"Par", 'stock':9, 'pricePerUnit':400.00, 'category':"Arete"});
createProduct({'title':"Aretes", 'description':"Acero inoxidable", 'imageUrl':"https://i.pinimg.com/474x/f9/e0/2c/f9e02c2e28baf7f8f83a8a853ab14373.jpg", 'unit':"Par", 'stock':3, 'pricePerUnit':100.00, 'category':"Arete"});
createProduct({'title':"Set brazaletes", 'description':"Perla y oro 14K", 'imageUrl':"https://i.pinimg.com/474x/f1/3d/5d/f13d5dd60701e49fb44ed83c959e1fc2.jpg", 'unit':"Set 2 piezas", 'stock':3, 'pricePerUnit':300.00, 'category':"Pulsera"});
createProduct({'title':"Duo collares", 'description':"Acero inoxidable", 'imageUrl':"https://i.pinimg.com/474x/e6/28/3f/e6283fb22afe7d34c20e55bac9bbc628.jpg", 'unit':"Set 2 piezas", 'stock':3, 'pricePerUnit':150.00, 'category':"Collar"});
createProduct({'title':"Set anillos", 'description':"Oro 15K", 'imageUrl':"https://i.pinimg.com/564x/0a/98/02/0a980264eb74aa8c16e24fdd065c65af.jpg", 'unit':"Set 4 piezas", 'stock':3, 'pricePerUnit':450.00, 'category':"Anillo"});
//Actualizar un producto
console.log("Products tras añadir los 9 productos");
console.table(getProducts());
let catalogo = getProducts();
console.log("Products tras actualizar el primer elemento");
updateProduct(catalogo[0]._uuid,{'title':"Set anillos", 'description':"Oro 15K", 'imageUrl':"https://i.pinimg.com/564x/0a/98/02/0a980264eb74aa8c16e24fdd065c65af.jpg", 'unit':"Set 4 piezas", 'stock':3, 'pricePerUnit':470.00, 'category':"Anillo"})
console.table(getProducts());
//Eliminar un producto
console.log("Products tras eliminar el primer elemento");
deleteProduct(catalogo[0]._uuid);
console.table(getProducts());



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Pruebas shopping cart
console.log("Pruebas shopping cart");
console.log("Añadir elementos al carrito");
let shoppingCart = new ShoppingCart();
shoppingCart.addItem(getProducts()[1]._uuid,3);
shoppingCart.addItem(getProducts()[2]._uuid,4);
shoppingCart.addItem(getProducts()[3]._uuid,2);
console.table(shoppingCart);
//Actualizar con add y mismo uuid
console.log("Actualizar con add");
shoppingCart.addItem(catalogo[0]._uuid,30);
console.log(shoppingCart);
//Update item
console.log("Actualizar con update item");
shoppingCart.updateItem(catalogo[0]._uuid,5);
console.log(shoppingCart);
//Remove item
console.log("Eliminar elemento del carrito");
shoppingCart.removeItem(catalogo[0]._uuid);
console.log(shoppingCart);
console.log("total",shoppingCart.calculateTotal())
//Validaciones shopping cart
//Comprar cantidades negativas
//shoppingCart.addItem(getProducts()[1]._uuid,-3);
//Actualizar cantidades negativas
//shoppingCart.updateItem(catalogo[0]._uuid,-5);
//Actualizar un elemento que no existe
//shoppingCart.updateItem("noExiste",5);
//Eliminar un elemento que no existe
shoppingCart.removeItem("noExiste");

