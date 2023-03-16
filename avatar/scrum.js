    
// Obtenemos el botón de envío y el input de nombre
var submitBtn = document.getElementById("submitBtn");
var submitBtnAvatar = document.getElementById("submitBtnAvatar");
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

   const xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         usuarios = JSON.parse(this.responseText);

         actualizarListaUsuarios(usuarios);
      }
   };

   xhttp.open("GET", "users.json", true);
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

   xhttp.open("GET", "users.json", true);
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
   
   $.ajax({
      method: 'POST',
      url: 'save_user.php',
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
      url: 'save_user.php',
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
         
            
         // Especifica la URL de la imagen
         var url = "avatar/" + name;
         avatar.innerHTML = "<img src='" + url + "' height='64px' width='64px' />";
         nameElement.classList.add("name");
         nameElement.innerText = name;

         valueElement.classList.add("value");
         
         if (value){
             if (datos.visualize=="true"){
                valueElement.innerText = value;
             }
             if (datos.visualize=="false" || datos.visualize=="new" ){
                valueElement.innerHTML = "<img src='vote.png' height='48px' width='48px' />";
             }
             if (datos.visualize=="clear"){
                valueElement.innerHTML = "<img src='thinking.gif'  height='48px' width='48px' />";
             }             
         }else{
            valueElement.innerHTML = "<img src='thinking.gif'  height='48px' width='48px' />";
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
   
});


function timer(){

}

function initializeDivs(){
    // Verificar si el nombre ya está guardado en la Local Storage    
    
    if (localStorage.getItem("nombre")) {
        $('#name').val(localStorage.getItem("nombre"));
        $('#nameAvatar').val(localStorage.getItem("nombre"));
        document.getElementById("myModal").style.display = "none";
        document.getElementById("scrum").style.display = "block";
        $("#myBtn").text ( "Joined as " + localStorage.getItem("nombre") );
    } else {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("scrum").style.display = "none";
    }
}

function guardarNombre() {
   var nombre = document.getElementById("name").value;   
   $('#nameAvatar').val(nombre);
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
    location.reload();
}

function revealCards(){
    $('#visualize').val("true");
    sendAction();
}

function initializeUserVote(){
    $('#estimation').val('');
    sendAction();
}

function refreshAction() {
    
        cargarAction();
    
}
function refreshUsers() {
    
        cargarUsuarios();
    
}
setInterval(refreshAction, 2000);
setInterval(refreshUsers, 4000);


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
// Cuando el usuario haga clic en el botón de envío, mostramos el nombre introducido en la consola y cerramos el modal
submitBtn.onclick = function() {
  guardarNombre();
  $("#myBtn").text ( "Joined as " + nameInput.value );
  console.log( nameInput.value);
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.getElementById("myBtnAvatar").addEventListener("click", function() {
  document.getElementById("myModalAvatar").style.display = "block";
});

document.getElementById("btn-cerrar").addEventListener("click", function() {
  document.getElementById("myModalAvatar").style.display = "none";
});



// Selecciona el formulario y el botón de envío
var form = $("#formAvatar");
var btnEnviar = $("#myBtnAvatar");

// Configura la acción de enviar el formulario con Ajax
form.on("submit", function(e) {
  // Detiene el envío del formulario predeterminado
  e.preventDefault();

  // Deshabilita el botón de envío mientras se procesa la solicitud
  btnEnviar.attr("disabled", true);

  // Crea un nuevo objeto FormData y agrega la imagen seleccionada
  var datos = new FormData(form[0]);
  datos.append("imagen", $("#imagen")[0].files[0]);
  datos.append("nameAvatar", $("#nameAvatar").val());

  // Envía la imagen utilizando Ajax
  $.ajax({
    type: "POST",
    url: "save_avatar.php",
    data: datos,
    processData: false,
    contentType: false,
    success: function(data) {
      // Si la solicitud es exitosa, actualiza la página con los resultados
      console.log(data);
    },
    error: function(xhr, textStatus, errorThrown) {
      // Si hay un error, muestra un mensaje de error
      alert('Error to send/save image :( ');
      console.error("Error al enviar la imagen: " + textStatus);
    },
    complete: function() {
      // Habilita el botón de envío cuando se completa la solicitud
      document.getElementById("myModalAvatar").style.display = "none";
      btnEnviar.attr("disabled", false);
      location.reload();
    }
  });
});
