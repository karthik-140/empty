const form=document.getElementById('my-form');
form.addEventListener('submit',onsubmit)
function onsubmit(e){
  e.preventDefault();
  const price=e.target.price.value;
  const product=e.target.product.value;
  const obj={
    price,product
  }
  axios.post('https://crudcrud.com/api/0bcc8df7a6894a3dbed306ee2a236272/products',obj)
  .then((response)=>{
    showProductOnScreen(response.data)
    console.log(response)
  })
  .catch(err=>console.log(err))
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/0bcc8df7a6894a3dbed306ee2a236272/products')
    .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            showProductOnScreen(response.data[i]);
        }
    })
    .catch(err=>console.log(err));
})

let totalprice=0;
let element=document.getElementById('total');

function showProductOnScreen(show){
   document.getElementById('price').value='';
   document.getElementById('product').value='';
   if(localStorage.getItem(show.product!==null)){
    removeProductFromScreen(show.product);
   }
   const parentNode=document.getElementById('list');
   const childNode=`<li id=${show._id} style="margin-bottom:10px;">${show.price} - ${show.product}
        <button onclick="deleteProduct('${show._id}','${show.price}')" style="float:right; margin-left:5px;">Delete</button>  
        <button onclick=editProduct('${show.price}','${show.product}','${show._id}') style="float:right;">Edit</button>
                </li>`
   parentNode.innerHTML=parentNode.innerHTML+childNode;

   totalprice += parseInt(show.price);
   element.innerHTML=totalprice;
}

function editProduct(price,product,_id){
   document.getElementById('price').value=price;
   document.getElementById('product').value=product;
   axios.put("https://crudcrud.com/api/0bcc8df7a6894a3dbed306ee2a236272/products/"+_id,{
    'price':document.getElementById('price').value,
    'product':document.getElementById('product').value
   })
   .then((response)=>{
    deleteProduct(_id,price);
    console.log(response);
   })
   .catch(err=>console.log(err));
}

function deleteProduct(_id,price){
    axios.delete(`https://crudcrud.com/api/0bcc8df7a6894a3dbed306ee2a236272/products/${_id}`)
    .then((response)=>{
        removeProductFromScreen(_id);
        console.log(response);
    })
    totalprice -= parseInt(price);
   element.innerHTML=totalprice;
}
function removeProductFromScreen(_id){
    const parentNode=document.getElementById('list');
    const childNode=document.getElementById(_id);
    if(childNode){
        parentNode.removeChild(childNode);
    }
}