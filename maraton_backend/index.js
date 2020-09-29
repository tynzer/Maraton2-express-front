/*
    Backend E-commerce

    Nota del cliente: 
    "Necesito un servicio RESTFul que me permita registrar un listado de productos comprados, precio, identificador de cliente y metodo de pago"

    Modelo de datos : 
    {
        "id": string,
        "clientId": string,
        "products": Array[], (Se guarda el identificador de producto, string)
        "amount": number,
        "paymentMethod": "Credit Card" | "Cash" | "Bitcoin"
    }

    Ejemplo:
    {
        "id": "adkjfh",
        "clientId": "1000",
        "products": ["100","300","400","500","600","700","800"],
        "amount": 10000,
        "paymentMethod": "Credit Card"
    }
*/

/*

MARATON BACKEND

1) Completar el servicio API REST, está incompleto.
2) Crear pruebas utilizando POSTMAN para todas las rutas (GET/POST/PUT/DELETE).
3) Validar en la carga/modificación (POST/PUT) que recibimos todos los datos necesarios. Sino, informar error de request.
4) Agregar al modelo de datos el atributo: createdAt (Date). Se debe cargar la fecha actual.  
5) BONUS: Crear un front-end simple que permita hacer una carga de datos desde un formulario. Respetando el modelo de datos.
6)  Elegí algún ejercicio de la maratón, e intenta encontrar una nueva forma de resolución, que sea distinta a la primera. 
7) Si fueses mentor/a, y tuvieses que pensar un ejercicio para la maratón, ¿Cuál sería? Te proponemos inventar un ejercicio nuevo que implique poner en práctica los conocimientos vistos hasta acá sobre Backend. 
Para finalizar:
A cada estudiante le tocará corregir el código de algún compañero/a. Tendrán que darle una devolución por escrito, marcando los aciertos y desaciertos, y las cosas que se pueden mejorar. Tengan en cuenta, a la hora de escribir, que el mensaje sea lo más organizado posible, para que el texto tenga claridad a la hora de leerse. Además, entendiendo que tendrán que juzgar el trabajo de un compañero/a, trabajen desde la empatía, para lograr una evaluación constructiva.
*/


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const uniqid = require("uniqid");
const { raw } = require("express");

const app = express();
const PORT = 3000;

//////////////////// Aplico Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

///////////////////// Init Array de Compras. (Simulo una Base de datos)
let compras = [{
  "id": "42ibc8kfn8rzpi",
  "clientId": "1000",
  "products": ["100", "300", "400", "500", "600", "700", "800"],
  "amount": 10000,
  "paymentMethod": "Credit Card",
  "createdAt": "2020-09-25T22:55:32.724Z"
},
{"id": "42ibc8kfn8ed01",
"clientId": "1001",
"products": ["101", "200", "700", "800"],
"amount": 5000,
"paymentMethod": "Bitcoin",
"createdAt": "2020-09-29T00:40:21.275Z"
},



];

//////////////////// Defino Rutas, me baso en el modelo REST
app.get("/compras", function (req, res) {
  res.status(200).send({ compras });
});

app.get("/compras/:id", function (req, res) {
  let CompraID;
  let id = req.params.id

  compras.forEach(function (compra) {
    if (compra.id == id) {
      CompraID = compra
    }
  })

  if (CompraID) {
    res.status(200).send({ "compra": CompraID });
  }
  else {
    res.status(400).send({ "mensaje": "compra no encontrada" });
  }

});


app.post("/compras/", function (req, res) {

  if (!req.body.clientId || !req.body.products || !req.body.paymentMethod || !req.body.amount) {
    res.status(400).send({ "mensaje": "compra no creada, no tiene algun parametro requerido" })
  }
  else if (req.body.id) {
    res.status(400).send({ "mensaje": "compra no creada, no se pude crea compra con id" })
  } else {
    const compraAdd = {
      "id": uniqid(),
      "clientId": req.body.clientId,
      "products": req.body.products,
      "amount": req.body.amount,
      "paymentMethod": req.body.paymentMethod,
      "createdAt": new Date()
    }

    compras.push(compraAdd)
    res.status(201).send({ "compraAgregada": compraAdd })
    console.log(compras)

  }

});

app.put("/compras/:id", function (req, res) {
  let compraPut;
  if (!req.body.clientId || !req.body.products || !req.body.paymentMethod || !req.body.amount) {
    res.status(400).send({ "mensaje": "compra no creada, no tiene algun parametro requerido" })
  }
  else {
    let compraId = req.params.id
    compras.forEach(function (compra) {
      if (compraId == compra.id) {
        compra.clientId = req.body.clientId;
        compra.products = req.body.products;
        compra.amount = req.body.amount;
        compra.paymentMethod = req.body.paymentMethod;
        compra.createdAt = new Date();
        compraPut=compra;
      }
    })
    if (compraPut) {
      res.status(201).send({ "compraModificada": compraPut})
    }
    else {
      res.status(404).send({ "mensaje": "Compra no encontrada" })
    }
  }
});
/* 
 
    let compraEncontrada = getCompraID(compras, req.params.id)
    console.log(compraEncontrada)
    if (compraEncontrada) {
     
      compraEncontrada.clientId = req.body.clientId
      compraEncontrada.products = req.body.products,
        compraEncontrada.amount = req.body.amount,
        compraEncontrada.paymentMethod = req.body.paymentMethod,
        compraEncontrada.createdAt = new Date()
      res.status(201).send({ "compraModificada": compraEncontrada })
    } else {
      res.status(404).send({ "mensaje": "Compra no encontrada" })
    } */



app.delete("/compras/:id", function (req, res) {
let deleteID = req.params.id;
let compraDelete; 
let indiceID;
compras.forEach(function(compra,index){
  if(deleteID==compra.id){
    compraDelete = compra
    indiceID = index
  }
})
if (compraDelete){
  compras.splice(indiceID,1)
  res.status(200).send({"CompraEliminada": compraDelete})
}else {
      res.status(404).send({ "mensaje": "Compra no encontrada" })
 }
 });


//Por defecto si no encuentra el recurso
app.get("/*", function (req, res) {
  res.status(404).send({ message: "recurso no encontrado" });
});


//Funciones
/* function BusarID(id){
 compras.forEach(function (compra){
  if (compra.id == id){
    return CompraID = compra
}
})
 

function getNextID() {
  //BUSCAR  CLIENTE ID MAXIMO Y A ESO SUMARLE UNO;
  return (compras.reduce((a, b) => { return a.clientId > b.clientId ? a : b })).clientId + 1;
}




function getCompraID(array, id) {
  //BUSCAR  EL ID ;
  console.log(array)

  array.forEach(function (elemento) {
    if (id == elemento.id) return compraEncontrada = elemento

  })
}
*/

//////////////////// Ahora que tengo todo definido y creado, levanto el servicio escuchando peticiones en el puerto
app.listen(PORT, function () {
  console.log(`Maraton Guayerd running on PORT: ${PORT}\nhttp://localhost:${PORT}/\n`);
});
