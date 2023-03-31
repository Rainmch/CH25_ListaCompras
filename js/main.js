// El código va aquí -> 
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertBanner = document.getElementById("alertValidaciones");
let alertBannerText = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla =  tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let total = document.getElementById("precioTotal");

let datos = [];

let idTimeout;
let precio;
let contador=0;
let isValid = true;
let totalProductos = 0;
let costoTotal = 0;


btnClear.addEventListener("click", function(event){
    txtName.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML ="";

    contador = 0;
    totalProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText = "0";
    productosTotal.innerText = "0";
    total.innerText = "$ 0";

    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalProductos",totalProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
});

function validarCantidad(){
    if(txtNumber.value.length == 0){
        return false;
    }
    if(isNaN(txtNumber.value)){
        return false;
    }
    if(parseFloat(txtNumber.value) <=0){
        return false;
    }
    return true;
}
function getPrecio(){
     return Math.floor (Math.random() * 50 * 100)/100;
}

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeout);
    let errorMSJ = "Se deben agregar los siguientes valores <ul>";
    alertBannerText.innerHTML = "";
    alertBanner.style.display = "none";
    if(txtName.value.length <2 ){
        txtName.style.border = "solid thin red";
        errorMSJ += "<li>Escribe un nombre valido</li>";
        alertBanner.style.display = "block";
        isValid = false;
    }else{
        txtName.style.border = "";
        
    }
    if(! validarCantidad()){
        txtNumber.style.border = "solid thin red";
        errorMSJ += "<li>Escribir una cantidad valida</li>";
        alertBanner.style.display = "block";
        isValid = false;
    }else{
        txtNumber.style.border = "";
    }
    errorMSJ += "</ul>";
    alertBannerText.insertAdjacentHTML("beforeend", errorMSJ);
    idTimeout =  setTimeout(function(){
        alertBanner.style.display = "none";
    }, 5000);

    if(isValid){
        precio = getPrecio();
        contador ++;
        let row = `
                    <tr>
                        <th>${contador}</th>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>
        `;
        let elemento = `{
                "id" : ${contador},
                "nombre" : "${txtName.value}",
                "cantidad" : "${txtNumber.value}",
                "precio" : ${precio}
        }`;

        datos.push(JSON.parse(elemento));
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla[0].insertAdjacentHTML("beforeend",row);
        contadorProductos.innerText = contador;
        totalProductos += parseFloat(txtNumber.value);
        costoTotal += precio * parseFloat(txtNumber.value);
        total.innerText = `$ ${costoTotal.toFixed(2)}`;
        productosTotal.innerText = totalProductos; 

        let resumen = `{
                        "contadorProductos" : ${contador},
                        "totalProductos" : ${totalProductos},
                        "costoTotal" : ${costoTotal}       }`;
        localStorage.setItem("resumen", resumen);
        // localStorage.setItem("contadorProductos",contador);
        // localStorage.setItem("totalProductos",totalProductos);
        // localStorage.setItem("costoTotal", costoTotal.toFixed(2));

        txtName.value = "";
        txtNumber.value = "";
        txtNumber.focus();
    }
});

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim();
});

txtName.addEventListener("blur", function(event){
    txtName.value = txtName.value.trim();
});

window.addEventListener("load", function(){
    if(localStorage.getItem("resumen") == null){
        let resumen = `{
            "contadorProductos" : ${contador},
            "totalProductos" : ${totalProductos},
            "costoTotal" : ${costoTotal.toFixed(2)}       }`;
        localStorage.setItem("resumen", resumen);
    }
    let res = JSON.parse(this.localStorage.getItem("resumen"));
    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach( e => {
            let row = `<tr>
                    <th>${e.id}</th>
                    <th>${e.nombre}</th>
                    <th>${e.cantidad}</th>
                    <th>${e.precio}</th>
                    </tr>`;
            cuerpoTabla[0].insertAdjacentHTML("beforeend",row);
        });
    }
    // if(localStorage.getItem("contadorProductos")==null){
    //     localStorage.setItem("contadorProductos", "0");
    // }
    // if(localStorage.getItem("totalProductos") == null){
    //     localStorage.setItem("totalProductos", "0");
    // }
    // if(localStorage.getItem("costoTotal") == null){
    //     localStorage.setItem("costoTotal", "0.0");
    // }
    contador = res.contadorProductos;
    totalProductos = res.totalProductos;
    costoTotal =  res.costoTotal;

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalProductos;
    total.innerText = `$ ${costoTotal.toFixed(2)}`;
});

