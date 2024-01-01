const myForm = document.querySelector('#my-form');
const priceInput = document.querySelector('#price');
const productInput = document.querySelector('#product');
const categoriesInput = document.querySelector('#categories');
// const userList = document.querySelector('#user')

myForm.addEventListener("submit", addProduct)

async function listProducts(){
    try {


        const response = await axios.get("https://crudcrud.com/api/9357b138d42944f0b26e7fc65214cc7e/products")
        response.data.forEach(product => {
            
            if (!document.getElementById(product._id)) {
                const list = document.querySelector(`#${product.category}`)
                const li = document.createElement('li')
                li.className = 'm-3'
                li.id = product._id
                li.appendChild(document.createTextNode(`${product.price} : ${product.category} : ${product.product}`))
                const btn = document.createElement('button')
                btn.appendChild(document.createTextNode('Delete'))
                btn.className = 'btn btn-danger btn-sm m-1 delete'
                li.appendChild(btn)
                list.appendChild(li)
                list.addEventListener('click', removeProduct)
            }
        });
    }
   catch(error) {
    console.log(error.toString())
   }
}

async function removeProduct(e) {
    e.preventDefault()
    try {
        let parent = e.target.parentElement
        await axios.delete(`https://crudcrud.com/api/9357b138d42944f0b26e7fc65214cc7e/products/${parent.id}`)
        await listProducts()
    }
    catch(error) {
        console.log(error.toString())
    }
}

function addProduct(e) {
    e.preventDefault()

    let productObj = {
        price: `${priceInput.value}`,
        product: `${productInput.value}`,
        category: `${categoriesInput.value}`
      }
      
    axios.post("https://crudcrud.com/api/9357b138d42944f0b26e7fc65214cc7e/products", productObj)
    .then(async (res) => {
        await listProducts()
    }).catch((err) => {
        alert(err)
    })

    

    myForm.reset()
}

listProducts()