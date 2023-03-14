let usuarios;
let usuario = [];

function agregarUsuario() {
   let nombre = localStorage.getItem("nombre");
   let estimacion = document.getElementById("estimation").value;
   usuarios.push({
      nombre: nombre,
      estimacion: estimacion
   });
   escribirArchivoJSON();

}

function cargarUsuarios() {
   /*
   let xhr = new XMLHttpRequest();
   xhr.open("GET", "http://inverzorro.freecluster.eu/scrum/users.json");
   xhr.onload = function() {
       if (xhr.status === 200) {
           let datos = JSON.parse(xhr.responseText);

           usuarios = datos.usuarios;
           actualizarListaUsuarios(usuarios);

       }
   };
   xhr.send();
   */

   const xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         usuarios = JSON.parse(this.responseText);

         actualizarListaUsuarios(usuarios);
      }
   };

   xhttp.open("GET", "http://inverzorro.freecluster.eu/scrum/users.json", true);
   xhttp.send();

}

function escribirArchivoJSON() {}

$('#user-form').submit(function (event) {
   event.preventDefault();

    sendData();

});

function sendData(){


   // Obtenemos los valores de los campos de entrada
   var name = localStorage.getItem("nombre");
   var estimation = $("#estimation").val();
   var visualize = $("#visualize").val();
   
   // Creamos un objeto de datos para enviar al servidor
   var datos = {
      name,
      estimation,
      visualize
   };
   
   /*
       let datosJSON = JSON.stringify(datos);
       let xhr = new XMLHttpRequest();
       xhr.open("POST", "http://inverzorro.freecluster.eu/scrum/save_user.php");
       xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       xhr.send(datosJSON);
     */
   $.ajax({
      method: 'POST',
      url: 'http://inverzorro.freecluster.eu/scrum/save_user.php',
      data: datos,
      success: function (data) {
         //alert('Usuario guardado correctamente.');
         cargarUsuarios();
      },
      error: function () {
         //alert('Error al guardar el usuario.');
      }
   });

    

}


function actualizarListaUsuarios(usuarios) {

   let listaUsuarios = document.getElementById("usuarios");
   listaUsuarios.innerHTML = "";

   let name = "";
   let value = "";
   let visualize = "";

   const listContainer = document.getElementById("list-container");
   listContainer.innerHTML = "";

   let datos = usuarios;
    $('#visualize').val(datos.visualize);       

   for (let clave in datos.usuarios) {

   visualize = datos.visualize;
   

      name = datos.usuarios[clave].nombre;
      value = datos.usuarios[clave].estimacion;
      
      

    const avatar = document.createElement("div");
    const nameElement = document.createElement("div");
    const listItem = document.createElement("div");
    const valueElement = document.createElement("div");


      if (name) {
         avatar.classList.add("avatar");
         avatar.innerHTML = name.charAt(0).toUpperCase();

         nameElement.classList.add("name");
         nameElement.innerText = name;

         valueElement.classList.add("value");
         if (value){
             if (datos.visualize=="true"){
                valueElement.innerText = value;
             }else{
                valueElement.innerText = "Voted";
             }
         }else{
            valueElement.innerText = "N/A";
         }
         
         listItem.classList.add("list-item");
         listItem.appendChild(avatar);
         listItem.appendChild(nameElement);
         listItem.appendChild(valueElement);
         listContainer.appendChild(listItem);
      }
   }
   
}


function fibonacci(num) {
   var a = 1,
      b = 2,
      temp;
   var fib = [a, b];
   for (var i = 2; i <= num; i++) {
      temp = b;
      b = a + b;
      a = temp;
      if (a != b)
         fib.push(b);
   }
   return fib;
}

function createCards(){

        var serie = fibonacci(7);

        var tarjetas = document.getElementById("tarjetas");
        var inputFibonacci = document.getElementById("estimation");
        for (var i = 0; i < serie.length; i++) {
        var tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = serie[i];
        tarjeta.addEventListener("click", function () {
            inputFibonacci.value = this.innerHTML;
            var tarjetasSeleccionadas = document.querySelectorAll(".tarjeta-seleccionada");
            for (var j = 0; j < tarjetasSeleccionadas.length; j++) {
                tarjetasSeleccionadas[j].classList.remove("tarjeta-seleccionada");
            }
            this.classList.add("tarjeta-seleccionada");
        });
        tarjetas.appendChild(tarjeta);
        }

}

const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", () => {
   const nameInput = document.getElementById("name");
   const valueInput = document.getElementById("estimation");
   const name = nameInput.value;
   const value = valueInput.value;
   if (name && value) {
      
      const listContainer = document.getElementById("list-container");
      
      const avatar = document.createElement("div");
            avatar.classList.add("avatar");
            avatar.innerHTML = name.charAt(0).toUpperCase();
      const nameElement = document.createElement("div");
            nameElement.classList.add("name");
            nameElement.innerText = name;
      
      const valueElement = document.createElement("div");
            valueElement.classList.add("value");
            valueElement.innerText = "N/A";
      const listItem = document.createElement("div");
            listItem.classList.add("list-item");
            listItem.appendChild(avatar);
            listItem.appendChild(nameElement);
            listItem.appendChild(valueElement);
            listContainer.appendChild(listItem);
            // nameInput.value = "";
            // valueInput.value = "";
   }
});


function timer(){

    // Obtener el elemento contador
    const contador = document.getElementById('contador');

    // Definir la fecha y hora objetivo
    const fechaObjetivo = new Date('2023-03-09T21:28:00');

    // Actualizar el contador cada segundo
    setInterval(() => {
    // Obtener la fecha y hora actual
    const fechaActual = new Date();

    // Calcular la diferencia entre la fecha objetivo y la actual
    const diferencia = fechaActual - fechaObjetivo;

    // Convertir la diferencia a segundos
    const segundos = Math.floor(diferencia / 1000);

    // Calcular los minutos, horas y días restantes
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    // Actualizar el contenido del elemento contador
    contador.innerHTML = `${minutos % 60} min, ${segundos % 60} sec`;
    }, 1000);
}

function initializeDivs(){
    // Verificar si el nombre ya está guardado en la Local Storage    
    
    if (localStorage.getItem("nombre")) {
        $('#name').val(localStorage.getItem("nombre"));
        document.getElementById("popup").style.display = "none";
        document.getElementById("scrum").style.display = "block";
    } else {
        document.getElementById("popup").style.display = "block";
        document.getElementById("scrum").style.display = "none";
    }
}

function guardarNombre() {
   var nombre = document.getElementById("name").value;   
   localStorage.setItem("nombre", nombre);
   document.getElementById("popup").style.display = "none";
   document.getElementById("scrum").style.display = "block";
   sendData();
}

function clearVotes(){

    
}

function initializeUserVote(){
    $('#estimation').val('');
    sendData();
}

function refresh() {
  sendData();
}

setInterval(refresh, 5000);


initializeUserVote();
initializeDivs();
createCards();
timer();