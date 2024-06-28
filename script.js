let productsAux = []
let products = [
    {
        id: 1,
        product_name: "Fone de ouvido",
        product_description: "Headset Bluetooth JBL",
        product_price: 125.80,
        available: "Sim",
    },
    {
        id: 2,
        product_name: "Bodysplash",
        product_description: "Bodysplash Floratta Boticário",
        product_price: 32.20,
        available: "Não",
    },
    {
        id: 3,
        product_name: "Máquina de Lavar",
        product_description: "Máquina Lava e Seca Sansung",
        product_price: 2439.00,
        available: "Sim",
    },

];

const table = document.getElementById('list-products')
let lastId = products.length

function searchWord() {
    if(productsAux.length) {
        products = productsAux
    }

    productsAux = products

    const form = document.getElementById('form-search')
    const formData = new FormData(form)
    const searchWord = formData.get('search')

    const found = []

    productsAux.find(function (item) {
        if(item.product_name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())) {
            found.push(item)
        }
    })

    products = found
    renderTable()
    console.log(found)
}

// Criar um produto 

function create() {
    const form = formProduct()
    const product = getDataFromForm()
    products.push(product)
    renderTable()
    form.reset()
}

// Editar um produto 

function editById(id) {
    const form = formProduct()
    let product = {}
  
    for(let i = 0; i < products.length; i++){
      if(id === products[i].id){
        product = products[i]
      }
    }
    form.querySelector('input[name="id"]').value = product.id
    form.querySelector('input[name="product_name"]').value = product.product_name
    form.querySelector('input[name="product_description"]').value = product.product_description
    form.querySelector('input[name="product_price"]').value = product.product_price
    form.querySelector('input[name="available"]').value = product.available
}

function deleteById(id) {
    let list = products
    products = []
    for(let i = 0; i < list.length; i++){
      if(id != list[i].id){
        products.push(list[i])
      }
    }
  
    renderTable()
}
 
function update() {
    const form = formProduct()
    const product = getDataFromFormToEdit()
    const index = products.findIndex(i => i.id === parseInt(product.id));

    if (index !== -1) {
        products[index] = product;  
    } else {
        console.error('Produto não encontrado');
    }    
    
    renderTable()
    form.reset()
}

function edit() {
    update()
        const btnUpdate = document.getElementById('btn-update')
        btnUpdate.classList.add('d-none')
        const btnAdd = document.getElementById('btn-add')
        btnAdd.classList.remove('d-none')
        const updatedProduct = editById(products[index].id)
        console.log(products[index].id)
}

// Renderiza tabela 

function renderTable() {
    const tbody = table.querySelector('tbody')
    tbody.textContent = ''
  
    for(let i = 0; i < products.length; i++){
  
      const tr = document.createElement('tr')
  
      Object.keys(products[i]).forEach((key) => {
        const td = document.createElement('td')
        td.textContent = products[i][key]
        tr.appendChild(td)
      })
  
      const td = document.createElement('td')
  
      //Cria o botão para deletar um item
      const btnDelete = document.createElement('button')
      btnDelete.classList.add('btn','btn-sm', 'btn-danger', 'mx-3')
      //Cria o botão para editar um item
      const btnEdit = document.createElement('button')
      btnEdit.classList.add('btn','btn-sm', 'btn-primary')
      
      btnEdit.addEventListener('click', function() {
        const btnAdd = document.getElementById('btn-add')
        btnAdd.classList.add('d-none')
        const btnUpdate = document.getElementById('btn-update')
        btnUpdate.classList.remove('d-none')
        editById(products[i].id)
      })
      btnDelete.addEventListener('click', function() {
        deleteById(products[i].id)
      })
      const iconEdit = document.createElement('i')
      iconEdit.classList.add('fa-solid', 'fa-pen-to-square')
      btnEdit.appendChild(iconEdit)
  
      const iconDelete = document.createElement('i')
      iconDelete.classList.add('fa-solid', 'fa-trash-can')
      btnDelete.appendChild(iconDelete)
  
      td.appendChild(btnEdit)
      td.appendChild(btnDelete)
      tr.appendChild(td)
  
      tbody.appendChild(tr)
    }
  }

// Pega os dados do formulário

function getDataFromForm() {

    const form = formProduct()
    const formData = new FormData(form)
    const id = createDynamicId()
    const { product_name, product_description, product_price, available } = Object.fromEntries(formData)
  
    const data = { id, product_name, product_description, product_price, available }
  
    return data
  }

function getDataFromFormToEdit() {
    const form = formProduct()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    return data
}

function createDynamicId() {
    if(!products.length){
        return lastId
    }

    return ++lastId
}

function formProduct() {
    const form = document.getElementById('form-add')
    return form
}

renderTable()