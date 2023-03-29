// El código va aquí -> 
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertBanner = document.getElementById("alertValidaciones");
let alertBannerText = document.getElementById("alertValidacionesTexto");

btnClear.addEventListener("click", function(event){
    txtName.value = "";
    txtNumber.value = "";
});

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let errorMSJ = "Se deben agregar los siguientes valores <ul>";
    alertBannerText.innerHTML = "";
    alertBanner.style.display = "none";
    if(txtName.value.length == 0){
        txtName.style.border = "solid thin red";
        errorMSJ += "<li>Escribe un nombre valido</li>";
        alertBanner.style.display = "block";
    }else{
        txtName.style.border = "";
        
    }
    if(txtNumber.value.length == 0){
        txtNumber.style.border = "solid thin red";
        errorMSJ += "<li>Escribir una cantidad valida</li>";
        alertBanner.style.display = "block";
    }else{
        txtNumber.style.border = "";
    }
    errorMSJ += "</ul>";
    alertBannerText.insertAdjacentHTML("beforeend", errorMSJ);
});

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim();
});

txtName.addEventListener("blur", function(event){
    txtName.value = txtName.value.trim();
});
