const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal.container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const productos = [
    {
    id: 1,
    nombre: "pestañas clasicas",
    precio: 2800,
    img:("/js/img/clasicas.jpg"),
    cantidad: 1,
},
{
id: 2,
nombre: "pestañas 2D",
precio: 3000,
img: ("/js/img/dos-de.jpg"),
cantidad: 1,
},
{
    id: 3,
    nombre: "pestañas 3D",
    precio: 3200,
    img:("/js/img/tres-de.jpg"),
    cantidad: 1,
},
{
    id: 4,
    nombre: "pestañas 4D",
    precio: 3400,
    img:("/js/img/pestañas.jpg"),
    cantidad: 1,
},
{
    id: 5,
    nombre: "pestañas 5D",
    precio: 3700,
    img:("/js/img/cinco-de.jpg"),
    cantidad: 1,
},
{
    id: 6,
    nombre: "pestañas volumen ruso",
    precio: 4000,
    img:("/js/img/volumen-ruso.jpg"),
    cantidad: 1,
},
{
    id: 7,
    nombre: "pestañas mega volumen",
    precio: 4500,
    img:("/js/img/mega.jpg"),
    cantidad: 1,
},
{
    id: 8,
    nombre: "lifting + Henna + Botox",
    precio: 2600,
    img:("/js/img/lifting.jpg"),
    cantidad: 1,
},
{
    id: 9,
    nombre: "Remocion",
    precio: 600,
    img:("/js/img/logo.jpg"),
    cantidad: 1,
},
{
    id: 10,
    nombre: "Color",
    precio: 300,
    img:("/js/img/logo.jpg"),
    cantidad: 1,
},
{
    id: 11,
    nombre: "Strass",
    precio: 200,
    img:("/js/img/logo.jpg"),
    cantidad: 1,
},


];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((producto) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `  
    <img src=" ${producto.img}">
   <h3>${producto.nombre}</h3>
   <p class="price">${producto.precio} $</p> 
    `;
    shopContent.append(content);
    let comprar = document.createElement("button") 
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append (comprar);

    comprar.addEventListener('click', ()=>{
        const repeat = carrito.some((repeatProducto)=> repeatProducto.id === producto.id);
       if(repeat){
        carrito.map((prod)=>{
            if(prod.id === producto.id){
                prod.cantidad++;
            }
        });
       }else{
         carrito.push({
            id: producto.id,
            img: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
        });
       
       
        console.log(carrito);
        carritoCounter();
        saveLocal();
    }    
    });
});

const pintarCarrito = () =>{
    modalContainer.innerHTML="";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML= `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button"


    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display ="none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((producto) =>{ 
   let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML =` 
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio} $ </p>
         <span class="restar">-</span>
        <p>Cantidad: ${producto.cantidad}</p>
        <span class= "sumar">+</span>
        <p>Total: ${producto.cantidad * producto.precio}</p>
        <span class="delete-producto"> ❌ </span>
    `;

    modalContainer.append(carritoContent);
    
    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", ( )=>{
   if(producto.cantidad !== 1){
      producto.cantidad--;
   }
        saveLocal();
        pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", ()=>{
        producto.cantidad++;
        saveLocal();
        pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-producto");
    eliminar.addEventListener("click", ()=>{
        eliminarProducto(producto.id);
    });

});

const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
const totalBuying = document.createElement("div");
totalBuying.className = "total-content";
totalBuying.innerHTML = `total a pagar: ${total} $`;
modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);
const eliminarProducto = (id)=>{
    const foundid = carrito.find((element)=> element.id === id);
    console.log(foundid);
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundid;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = ()=> {
    cantidadCarrito.style.display ="block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();

const saveLocal = ()=> {
localStorage.setItem("carrito",JSON.stringify(carrito));

};

