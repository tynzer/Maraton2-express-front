

//empieza programa

function getComprasList() {
  const tbodyCompras = document.querySelector("#tbodyCompras");
  fetch("http://localhost:3000/compras")
    .then(response => response.json())
    .then(result => {
      let frag = "";

      result.compras.forEach(function (compra) {

        frag += `<tr>
                  <td>${compra.id}</td>
                  <td>${compra.clientId}</td>
                  <td>${compra.products}</td>
                  <td>${compra.amount}</td>
                  <td>${compra.paymentMethod}</td>
                  <td>${compra.createdAt}</td>
                  <td><a href="#editCompraModal" class="edit" data-toggle="modal">
                        <i class="material-icons" data-toggle="tooltip"  
                        onclick="getComprasEdit('${compra.id}')" title="Edit">&#xE254;</i>
                      </a>
                      <a href="#deleteCompraModal" class="delete" data-toggle="modal">
                        <i class="material-icons" data-toggle="tooltip" id="del-1" onclick="deleteCompra('${compra.id}')"  title="Delete">&#xE872;</i>
                      </a>
                  </td>
                </tr>`
      })
      tbodyCompras.innerHTML = frag
    })
    .catch(error => console.log('error', error));
}


//getDetailsCompra
//const agregarBtm 
const formAdd = document.querySelector("#formAdd")
formAdd.addEventListener("submit", submitHandler)



function submitHandler(e) {
  e.preventDefault()

  let addClient = document.querySelector("#add-client").value
  let addProducts = document.querySelector("#add-products").value
  let addAmount = document.querySelector("#add-amount").value
  let addPayment = document.querySelector("#add-payment").value

  let data = {
    "clientId": addClient,
    "products": addProducts,
    "amount": addAmount,
    "paymentMethod": addPayment,
    "createdAt": new Date()
  };

  fetch("http://localhost:3000/compras", {
    method: 'POST',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', response))
    .then(getComprasList())
    .catch(error => console.error('Error:', error))
}


// Variables del formulario a editar
const editClient = document.querySelector("#edit-client")
const editProducts = document.querySelector("#edit-products")
const editAmount = document.querySelector("#edit-amount")
const editPayment = document.querySelector("#edit-payment")



function getComprasEdit(id) {
  // Toma los datos a editar



  fetch(`http://localhost:3000/compras/${id}`)
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      editClient.value = res.compra.clientId;
      editProducts.value = res.compra.products;
      editAmount.value = res.compra.amount;
      editPayment.value = res.compra.paymentMethod;
    });

  // Toma los datos editados y los actualiza
  const formEdit = document.querySelector("#formEdit")
  formEdit.addEventListener("submit", editSubmitHandler)


  function editSubmitHandler(e) {
    e.preventDefault()
    let dataUpdate = {
      "clientId": editClient.value,
      "products": editProducts.value,
      "amount": editAmount.value,
      "paymentMethod": editPayment.value,
      "createdAt": new Date()
    };

    fetch(`http://localhost:3000/compras/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dataUpdate),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', response))
      .then(getComprasList())
      .catch(error => console.error('Error:', error))
  }
}

function deleteCompra(id) {
  //Variable del formulario eliminar
  const formDelete = document.querySelector("#formDelete")
  formDelete.addEventListener("submit", delelteSubmiteHandler)

  function delelteSubmiteHandler() {
    //e.preventDefault()
    fetch(`http://localhost:3000/compras/${id}`,
      {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(getComprasList()) //no me gusta como quedo
      .catch(error => console.error('Error:', error))
  }
}