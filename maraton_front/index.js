
 
//empieza programa

function getComprasList(){
    const tbodyCompras = document.querySelector("#tdbodyMovies");
      fetch("http://localhost:3000/compras")
        .then(response => response.json())
        .then(result => {
            let frag="";
            console.log(result)
            result.compras.forEach(function(compra) {   
                console.log(compra)
             frag +=`<tr>
                <td>${compra.id}</td>
                <td>${compra.clientId}</td>
                <td>${compra.products}</td>
                <td>${compra.amount}</td>
                <td>${compra.paymentMethod}</td>
                <td>${compra.createdAt}</td>
                <td><a href="#editMovieModal" class="edit" data-toggle="modal">
                        <i class="material-icons" data-toggle="tooltip"  
                        onclick="getComprasEdit(${compra.id})" title="Edit">&#xE254;</i>
                    </a>
                    <a href="#deleteMovieModal" class="delete" data-toggle="modal">
                        <i class="material-icons" data-toggle="tooltip" id="del-1" onclick="deleteCompra(${compra.id})"  title="Delete">&#xE872;</i>
                    </a>
                </td>
            </tr>` 
            
           })
            tbodyMovies.innerHTML = frag  
        })
        .catch(error => console.log('error', error));
}


//getDetailsCompra
//const agregarBtm 
 const formAdd = document.querySelector("#formAdd")
 formAdd.addEventListener("submit", submitHandler)



function submitHandler(e){
e.preventDefault()

 
let addClient = document.querySelector("#add-client").value
let addProducts = document.querySelector("#add-products").value
let addAmount= document.querySelector("#add-amount").value
let addPayment = document.querySelector("#add-payment").value

let data = {
"clientId": addClient,
"products": addProducts,
"amount": addAmount,
"paymentMethod": addPayment,
"createdAt": new Date()
};

fetch(("http://localhost:3000/compras"), {
  method: 'POST',
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', response))
.then(getComprasList())
.catch(error => console.error('Error:', error)) }

 // funcion arreglar no toma los datos
 function getComprasEdit(id){
  // console.log(id)

fetch(`http://localhost:3000/compras/${id}`)
.then(function (res) {
    return res.json()
})
.then(function(compra){

let addClient = document.querySelector("#edit-client").value
let addProducts = document.querySelector("#edit-products").value
let addAmount= document.querySelector("#edit-amount").value
let addPayment = document.querySelector("#edit-payment").value

addClient = compra.clientId;

});
 }
//aca termina


const formEdit = document.querySelector("#formEdit")
formEdit.addEventListener("submit", addSubmitHandler)


function addSubmitHandler(){
    e.preventDefault()
    let editClient = document.querySelector("#edit-client").value
    let editProducts = document.querySelector("#edit-products").value
    let editAmount= document.querySelector("#edit-amount").value
    let editPayment = document.querySelector("#edit-payment").value
    
    let data = {
        "clientId": editClient,
        "products": editProducts,
        "amount": editAmount,
        "paymentMethod": editPayment,
        "createdAt": new Date()
        };

       // fetch(/compras/{}:id")    

}

