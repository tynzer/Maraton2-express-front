

//empieza programa

function getComprasList() {
  const tbodyCompras = document.querySelector("#tdbodyMovies");
  fetch("http://localhost:3000/compras")
    .then(response => response.json())
    .then(result => {
      let frag = "";
      console.log(result)
      result.compras.forEach(function (compra) {
        console.log(compra)
        frag += `<tr>
                <td>${compra.id}</td>
                <td>${compra.clientId}</td>
                <td>${compra.products}</td>
                <td>${compra.amount}</td>
                <td>${compra.paymentMethod}</td>
                <td>${compra.createdAt}</td>
                <td><a href="#editMovieModal" class="edit" data-toggle="modal">
                        <i class="material-icons" data-toggle="tooltip"  
                        onclick="getComprasEdit('${compra.id}')" title="Edit">&#xE254;</i>
                    </a>
                    <a href="#deleteMovieModal" class="delete" data-toggle="modal">
                        <i class="material-icons" data-toggle="tooltip" id="del-1" onclick="deleteCompra('${compra.id}')"  title="Delete">&#xE872;</i>
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
    .then(response => getComprasList())
    .catch(error => console.error('Error:', error))
}


// Variables del formulario a editar
const editClient = document.querySelector("#edit-client")
const editProducts = document.querySelector("#edit-products")
const editAmount = document.querySelector("#edit-amount")
const editPayment = document.querySelector("#edit-payment")




function getComprasEdit(id) {
  // console.log(id)

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

  const formEdit = document.querySelector("#formEdit")
  formEdit.addEventListener("submit", addSubmitHandler)


  function addSubmitHandler(e) {
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
      body: JSON.stringify(dataUpdate), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', response))
      .then(response => getComprasList())
      .catch(error => console.error('Error:', error))
  } 
}

function deleteCompra(id) {
  fetch(`http://localhost:3000/compras/${id}`,
    {
      method: "DELETE"
    })
    .then(res => res.json()) // or res.json()
    .then(res => console.log(res))
    .then(response => getComprasList())
    .catch(error => console.error('Error:', error))
} 