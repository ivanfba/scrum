// Obtenemos el botón de envío y el input de nombre
var submitBtn = document.getElementById("submitBtn");
var nameInput = document.getElementById("name");


let actions;
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


function cargarAction() {

   const xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         actions = JSON.parse(this.responseText);

         actualizarAction(actions);
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



function sendAction(){


   // Obtenemos los valores de los campos de entrada
   var visualize = $("#visualize").val();
   
   // Creamos un objeto de datos para enviar al servidor
   var datos = {
      visualize
   };
   
   $.ajax({
      method: 'POST',
      url: 'http://inverzorro.freecluster.eu/scrum/save_user.php',
      data: datos,
      success: function (data) {
         //alert('Usuario guardado correctamente.');

         cargarAction();
         
      },
      error: function () {
         //alert('Error al guardar el usuario.');
      }
   }); 

}



function actualizarAction(datos) {

   let visualize = "";

    for (let clave in datos.visualize) {    

      visualize = datos.visualize;
      
      $('#visualize').val(visualize);
    }

   
}


function actualizarListaUsuarios(datos) {

   let listaUsuarios = document.getElementById("usuarios");
   listaUsuarios.innerHTML = "";

   let name = "";
   let value = "";
   let visualize = "";

   const listContainer = document.getElementById("list-container");
   listContainer.innerHTML = "";  
   

   for (let clave in datos.usuarios) {   

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
             }
             if (datos.visualize=="false" || datos.visualize=="new" ){
                valueElement.innerText = "Voted";
             }
             if (datos.visualize=="clear"){
                valueElement.innerText = "N/A";
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
   $('#visualize').val("false");
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

}

function initializeDivs(){
    // Verificar si el nombre ya está guardado en la Local Storage    
    
    if (localStorage.getItem("nombre")) {
        $('#name').val(localStorage.getItem("nombre"));
        document.getElementById("myModal").style.display = "none";
        document.getElementById("scrum").style.display = "block";
    } else {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("scrum").style.display = "none";
    }
}

function guardarNombre() {
   var nombre = document.getElementById("name").value;   
   localStorage.setItem("nombre", nombre);
   document.getElementById("myModal").style.display = "none";
   document.getElementById("scrum").style.display = "block";
   sendData();
}

function clearVotes(){
    $('#visualize').val("clear");
    sendAction();
}


function newVote(){
    $('#visualize').val("new");
    sendAction();
}

function revealCards(){
    $('#visualize').val("true");
    sendAction();
}

function initializeUserVote(){
    $('#estimation').val('');
    sendAction();
}

function refresh() {
  //sendData();  
  cargarUsuarios();
  cargarAction();
}

setInterval(refresh, 2000);


initializeUserVote();
initializeDivs();
createCards();
cargarAction();



// Obtenemos el modal y el botón que abre el modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

// Obtenemos el botón de cierre del modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, abrimos el modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Cuando el usuario haga clic en el botón de cierre o en cualquier parte fuera del modal, cerramos el modal
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Cuando el usuario haga clic en el botón de envío, mostramos el nombre introducido en la consola y cerramos el modal
submitBtn.onclick = function() {
  guardarNombre();
  console.log("name: " + nameInput.value);
  modal.style.display = "none";
}
