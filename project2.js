const form=document.getElementById('my-form');
form.addEventListener('submit',onsubmit)
async function onsubmit(e){
    try{
        e.preventDefault();
        const price=e.target.price.value;
        const product=e.target.product.value;
        const obj={
          price,product
        }
       const post=await axios.post('https://crudcrud.com/api/bbdecaa4d5544297b75b7c343d49ac95/products',obj)
        console.log(post);
        showProductOnScreen(post.data);
    }catch(err){
      console.log(err);
    }
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/bbdecaa4d5544297b75b7c343d49ac95/products')
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

async function showProductOnScreen(show){
    try{
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
    }catch(err){
        console.log(err);
    }
   
}

async function editProduct(price,product,_id){
    try{
        document.getElementById('price').value=price;
        document.getElementById('product').value=product;
      const edit=await axios.put(`https://crudcrud.com/api/bbdecaa4d5544297b75b7c343d49ac95/products/${_id}`,{
         'price':document.getElementById('price').value,
         'product':document.getElementById('product').value
        })
        console.log(edit);
        deleteProduct(_id,price);
    }catch(err){
        console.log(err);
    }
   
}

async function deleteProduct(_id,price){
    try{
   const del=await axios.delete(`https://crudcrud.com/api/bbdecaa4d5544297b75b7c343d49ac95/products/${_id}`)
    totalprice -= parseInt(price);
    element.innerHTML=totalprice;
    removeProductFromScreen(_id);
    console.log(del);
   }catch(err){
    console.log(err);
}
}

function removeProductFromScreen(_id){
    try{
        const parentNode=document.getElementById('list');
        const childNode=document.getElementById(_id);
        if(childNode){
            parentNode.removeChild(childNode);
        }
    }catch(err){
      console.log(err);
    }
    }