
// Obtenemos el botón de envío y el input de name
var submitBtn = document.getElementById("submitBtn");
var kickBtn = document.getElementById("kickBtn");
var submitBtnAvatar = document.getElementById("submitBtnAvatar");
var nameInput = document.getElementById("name");


let actions;
let users;
let user = [];

/*
function agregaruser() {
   let name = localStorage.getItem("name");
   let estimacion = document.getElementById("estimation").value;
   users.push({
      name: name,
      estimacion: estimacion
   });
   writeJsonFile();

}
*/

function loadUsers() {

   const xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         users = JSON.parse(this.responseText);
         updateUserList(users);
      }
   };

   xhttp.open("GET", "users.json", true);
   xhttp.send();

}


function loadAction() {

   const xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         actions = JSON.parse(this.responseText);

         updateAction(actions);
      }
   };

   xhttp.open("GET", "users.json", true);
   xhttp.send();

}

function writeJsonFile() { }

$('#user-form').submit(function (event) {
   event.preventDefault();

   sendData();

});

function sendData() {


   // Obtenemos los valores de los campos de entrada
   var name = localStorage.getItem("name");
   var estimation = $("#estimation").val();
   var visualize = $("#visualize").val();

   // Creamos un objeto de data para enviar al servidor
   var data = {
      name,
      estimation,
      visualize
   };

   $.ajax({
      method: 'POST',
      url: 'save_user.php',
      data: data,
      success: function (data) {
         //alert('user guardado correctamente.');

         loadUsers();

      },
      error: function () {
         //alert('Error al guardar el user.');
      }
   });



}



function sendAction() {


   // Obtenemos los valores de los campos de entrada
   var visualize = $("#visualize").val();

   // Creamos un objeto de data para enviar al servidor
   var data = {
      visualize
   };

   $.ajax({
      method: 'POST',
      url: 'save_user.php',
      data: data,
      success: function (data) {
         //alert('user guardado correctamente.');

         loadAction();

      },
      error: function () {
         //alert('Error al guardar el user.');
      }
   });

}



function updateAction(data) {

   let visualize = "";

   for (let key in data.visualize) {

      visualize = data.visualize;

      $('#visualize').val(visualize);
   }


}


function updateUserList(data) {

   let userList = document.getElementById("users");
   userList.innerHTML = "";

   let name = "";
   let value = "";

   const listContainer = document.getElementById("list-container");
   listContainer.innerHTML = "";


   for (let key in data.users) {

      name = data.users[key].name;
      value = data.users[key].estimacion;

      const avatar = document.createElement("div");
      const nameElement = document.createElement("div");
      const listItem = document.createElement("div");
      const valueElement = document.createElement("div");


      if (name) {
         avatar.classList.add("avatar");

         // Especifica la URL de la imagen
         var url = "avatar/" + name;
         avatar.innerHTML = `<a onclick='javascript:openKickModal("${name}")';><img src=${url}?id=Math.round(Math.random() * 2)' height='64px' width='64px' /></a>`;
         nameElement.classList.add("name");         
         nameElement.innerHTML = "<font size=3px>" + name + "</font>";

         valueElement.classList.add("value");

         if (value) {
            if (data.visualize == "true") {
               valueElement.innerHTML = "<strong><font size=5px>" + value + "</font></strong>";
            }
            if (data.visualize == "false" || data.visualize == "new") {
               valueElement.innerHTML = "<img src='voted.png' height='48px' width='48px' />";
            }
            if (data.visualize == "clear") {
               valueElement.innerHTML = "<img src='thinking.png'  height='48px' width='48px' />";
            }
         } else {
            valueElement.innerHTML = "<img src='thinking.png'  height='48px' width='48px' />";
         }

         listItem.classList.add("list-item");
         listItem.appendChild(avatar);
         listItem.appendChild(nameElement);
         listItem.appendChild(valueElement);
         listContainer.appendChild(listItem);
      }
   }

}


function loadAverage() {
   fetch('users.json')
   .then(response => response.json())
   .then(data => {
    
      let total = 0;
      let count = 0;
      let mostVotedValue = null;
      let mostVotedCount = 0;
      const countMap = {};

      for (const userId in data.users) {
      const user = data.users[userId];
      if (user.estimacion !== null && user.estimacion != "" && !isNaN(user.estimacion)) {
         const estimation = parseInt(user.estimacion);
         total += estimation;
         count++;
         countMap[estimation] = (countMap[estimation] || 0) + 1;
         if (countMap[estimation] > mostVotedCount) {
            mostVotedCount = countMap[estimation];
            mostVotedValue = estimation;
         }
      }
      }

      let average = count > 0 ? total / count : 0;
      let message = `Average: ${average}`;
      if (mostVotedCount > 1){
         message = message + `<br>Most voted: ${mostVotedValue} (${mostVotedCount} votes)`;
      }

      if (mostVotedValue == average && mostVotedCount > 1){
         document.getElementById("confites").style.display = "";
         document.getElementById("congratsMsg").style.display = "";
         confetiFall();  
      }

      document.getElementById("resume").innerHTML = "<font size=5>"+message+"</font>";

     
   })
   .catch(error => console.error(error));

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

function createCards() {

   var serie = fibonacci(7);

   var cards = document.getElementById("cards");
   var inputFibonacci = document.getElementById("estimation");
   for (var i = 0; i < serie.length; i++) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML = serie[i];
      card.addEventListener("click", function () {
         inputFibonacci.value = this.innerHTML;
         var selectedCard = document.querySelectorAll(".selectedCard");
         for (var j = 0; j < selectedCard.length; j++) {
            selectedCard[j].classList.remove("selectedCard");
         }
         this.classList.add("selectedCard");
      });
      cards.appendChild(card);
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


function timer() {

}

function initializeDivs() {
   // Verificar si el name ya está guardado en la Local Storage    

   if (localStorage.getItem("name")) {
      $('#name').val(localStorage.getItem("name"));
      $('#nameAvatar').val(localStorage.getItem("name"));
      document.getElementById("myModal").style.display = "none";
      document.getElementById("scrum").style.display = "block";
      $("#myBtn").text("Joined as " + localStorage.getItem("name"));
   } else {
      document.getElementById("myModal").style.display = "block";
      document.getElementById("scrum").style.display = "none";
   }
}

function guardarname() {
   var name = document.getElementById("name").value;
   $('#nameAvatar').val(name);
   localStorage.setItem("name", name);
   document.getElementById("myModal").style.display = "none";
   document.getElementById("scrum").style.display = "block";
   sendData();
}

function clearVotes() {
   $('#visualize').val("clear");
   sendAction();
}


function newVote() {
   $('#visualize').val("new");
   sendAction();
   location.reload();
}

function revealCards() {
   $('#visualize').val("true");
   sendAction();
   loadAverage();
}

function initializeUserVote() {
   $('#estimation').val('');
   sendAction();
}

function refresh() {
   //sendData();  
   loadUsers();
   loadAction();
}

setInterval(refresh, 2000);


initializeUserVote();
initializeDivs();
createCards();
loadAction();



// Obtenemos el modal y el botón que abre el modal
var modal = document.getElementById("myModal");
var avatarModal = document.getElementById("myModalAvatar");
var kickModal = document.getElementById("myModalKick");

var btn = document.getElementById("myBtn");
// Obtenemos el botón de cierre del modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];

// Cuando el user haga clic en el botón, abrimos el modal
btn.onclick = function () {
   modal.style.display = "block";
}
// Cuando el user haga clic en el botón de cierre o en cualquier parte fuera del modal, cerramos el modal
span.onclick = function () {
   modal.style.display = "none";
}
span2.onclick = function () {
   avatarModal.style.display = "none";
}
span3.onclick = function () {
   kickModal.style.display = "none";
}
// Cuando el user haga clic en el botón de envío, mostramos el name introducido en la consola y cerramos el modal
submitBtn.onclick = function () {
   guardarname();
   $("#myBtn").text("Joined as " + nameInput.value);
   console.log(nameInput.value);
   modal.style.display = "none";
}
// Cuando el user haga clic en el botón de envío, mostramos el name introducido en la consola y cerramos el modal
kickBtn.onclick = function () {
   console.log(kickName.value);
   modal.style.display = "none";
}

window.onclick = function (event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

function openKickModal(name){

   document.getElementById("myModalKick").style.display = "block";
   $('#kickName').val(name);
}



// Selecciona el formulario y el botón de envío
var form = $("#formAvatar");
var btnEnviar = $("#myBtnAvatar");


document.getElementById("myBtnAvatar").addEventListener("click", function () {
   document.getElementById("myModalAvatar").style.display = "block";
});


// Configura la acción de enviar el formulario con Ajax
form.on("submit", function (e) {
   // Detiene el envío del formulario predeterminado
   e.preventDefault();

   // Deshabilita el botón de envío mientras se procesa la solicitud
   btnEnviar.attr("disabled", true);

   // Crea un nuevo objeto FormData y agrega la imagen seleccionada
   var data = new FormData(form[0]);
   data.append("imagen", $("#imagen")[0].files[0]);
   data.append("nameAvatar", $("#nameAvatar").val());

   // Envía la imagen utilizando Ajax
   $.ajax({
      type: "POST",
      url: "save_avatar.php",
      data: data,
      processData: false,
      contentType: false,
      success: function (data) {
         // Si la solicitud es exitosa, actualiza la página con los resultados
         console.log(data);
      },
      error: function (xhr, textStatus, errorThrown) {
         // Si hay un error, muestra un mensaje de error
         alert('Error to send/save image :( ');
         console.error("Error al enviar la imagen: " + textStatus);
      },
      complete: function () {
         // Habilita el botón de envío cuando se completa la solicitud
         document.getElementById("myModalAvatar").style.display = "none";
         btnEnviar.attr("disabled", false);
         location.reload();
      }
   });
});

function confetiFall() {
   var confites = document.getElementById("confites");
   var colores = ["#f3c518", "#e83c77", "#007bff", "#28a745", "#6f42c1", "#fd7e14"]; // Agregar colores a la matriz
   for (var i = 0; i < 550; i++) {
     var confite = document.createElement("div");
     confite.classList.add("confite");
     confite.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)]; // Asignar un color aleatorio a cada confite
     confite.style.left = Math.random() * 100 + "%";
     confite.style.top = Math.random() * 100 + "%";
     confite.style.animationDelay = Math.random() * 2 + "s";
     confites.appendChild(confite);
   }
 }
 