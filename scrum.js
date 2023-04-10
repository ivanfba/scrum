// Obtenemos el botón de envío y el input de name
var submitBtn = document.getElementById("submitBtn");
var kickBtn = document.getElementById("kickBtn");
var submitBtnAvatar = document.getElementById("submitBtnAvatar");
var nameInput = document.getElementById("name");
let actions;
let users;
let user = [];


function loadUsers() {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			users = JSON.parse(this.responseText);
			updateUserList(users);
		}
	};
	xhttp.open("GET", "users.json", true);
	xhttp.send();
}

function loadAction() {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			actions = JSON.parse(this.responseText);
			updateAction(actions);
		}
	};
	xhttp.open("GET", "users.json", true);
	xhttp.send();
}

function writeJsonFile() {}
$('#user-form').submit(function(event) {
	event.preventDefault();
	sendData();
});

function sendData() {
	// Obtain the values of the input fields.
	var name = localStorage.getItem("name");
	var estimation = $("#estimation").val();
	var visualize = $("#visualize").val();
	//Create a data object to send to the server.
	var data = {
		name,
		estimation,
		visualize
	};
	$.ajax({
		method: 'POST',
		url: 'save_user.php',
		data: data,
		success: function(data) {
			loadUsers();
		},
		error: function() {
			console.log('sendData(): Error to save.');
		}
	});
}

function sendAction() {
	// Obtain the values ​​of the input fields.
	var visualize = $("#visualize").val();
	// Create a data object to send to the server.
	var data = {
		visualize
	};
	$.ajax({
		method: 'POST',
		url: 'save_user.php',
		data: data,
		success: function(data) {
			loadAction();
		},
		error: function() {
			console.log('sendAction(): Error to save.');
		}
	});
}

function kickUser() {
	// Obtenemos los valores de los campos de entrada
	var name = $("#kickName").val();
	var visualize = 'K';
	var estimation = '0';
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
		success: function(data) {
			console.log('kickUser(): Removed user: ' + name);
         var modal = document.getElementById("myModalKick");
         modal.style.display = "none";
		},
		error: function() {
			console.log('kickUser(): Error to save.');
		}
	});
}

function updateAction(data) {
	let visualize = "";
	for(let key in data.visualize) {
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
	for(let key in data.users) {
		name = data.users[key].name;
		value = data.users[key].estimation;
		const avatar = document.createElement("div");
		const nameElement = document.createElement("div");
		const listItem = document.createElement("div");
		const valueElement = document.createElement("div");
		if(name) {
			avatar.classList.add("avatar");
			// Specifies the URL of the image
			var url = "avatar/" + name;
			avatar.innerHTML = `<a onclick='javascript:openKickModal("${name}")';><img src=${url}?id=Math.round(Math.random() * 2)' height='64px' width='64px' /></a>`;
			nameElement.classList.add("name");
			nameElement.innerHTML = "<font size=3px>" + name + "</font>";
			valueElement.classList.add("value");
			if(value) {
				if(data.visualize == "true") {
					valueElement.innerHTML = "<strong><font size=5px>" + value + "</font></strong>";
				}
				if(data.visualize == "false" || data.visualize == "new") {
					valueElement.innerHTML = "<img src='voted.png' height='48px' width='48px' />";
				}
				if(data.visualize == "clear") {
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
	fetch('users.json').then(response => response.json()).then(data => {
		let total = 0;
		let count = 0;
		let mostVotedValue = null;
		let mostVotedCount = 0;
		const countMap = {};
		for(const userId in data.users) {
			const user = data.users[userId];
			if(user.estimation !== null && user.estimation != "" && !isNaN(user.estimation)) {
				const estimation = parseInt(user.estimation);
				total += estimation;
				count++;
				countMap[estimation] = (countMap[estimation] || 0) + 1;
				if(countMap[estimation] > mostVotedCount) {
					mostVotedCount = countMap[estimation];
					mostVotedValue = estimation;
				}
			}
		}
		let average = count > 0 ? total / count : 0;
		let message = `Average: ${average}`;
		if(mostVotedCount > 1) {
			message = message + `<br>Most voted: ${mostVotedValue} (${mostVotedCount} votes)`;
		}
		if(mostVotedValue == average && mostVotedCount > 1) {
			document.getElementById("confites").style.display = "";
			document.getElementById("congratsMsg").style.display = "";
			confetiFall();
		}
		document.getElementById("resume").innerHTML = "<font size=5>" + message + "</font>";
	}).catch(error => console.error(error));
}

function fibonacci(num) {
	var a = 1,
		b = 2,
		temp;
	var fib = [a, b];
	for(var i = 2; i <= num; i++) {
		temp = b;
		b = a + b;
		a = temp;
		if(a != b) fib.push(b);
	}
	return fib;
}

function createCards() {
	var serie = fibonacci(7);
	var cards = document.getElementById("cards");
	var inputFibonacci = document.getElementById("estimation");
	for(var i = 0; i < serie.length; i++) {
		var card = document.createElement("div");
		card.className = "card";
		card.innerHTML = serie[i];
		card.addEventListener("click", function() {
			inputFibonacci.value = this.innerHTML;
			var selectedCard = document.querySelectorAll(".selectedCard");
			for(var j = 0; j < selectedCard.length; j++) {
				selectedCard[j].classList.remove("selectedCard");
			}
			this.classList.add("selectedCard");
		});
		cards.appendChild(card);
	}
}
const addBtn = document.getElementById("add-btn");
kickBtn
addBtn.addEventListener("click", () => {
	const nameInput = document.getElementById("name");
	const valueInput = document.getElementById("estimation");
	const name = nameInput.value;
	const value = valueInput.value;
	$('#visualize').val("false");
});

function timer() {}

function initializeDivs() {
	// Check if the name is already saved in Local Storage  
	if(localStorage.getItem("name")) {
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
   
   let oldName = localStorage.getItem("name");
   $("#kickName").val(oldName)

	var name = document.getElementById("name").value;
	$('#nameAvatar').val(name);
	localStorage.setItem("name", name);
	document.getElementById("myModal").style.display = "none";
	document.getElementById("scrum").style.display = "block";
	sendData();

   if (oldName!=name){
         // Remove the user old after 2 seconds:
         setTimeout(kickUser,2000);
   }
   

   
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
	loadUsers();
	loadAction();
}
setInterval(refresh, 2000);
initializeUserVote();
initializeDivs();
createCards();
loadAction();

// Gets the modal and the button that opens the modal
var modal = document.getElementById("myModal");
var avatarModal = document.getElementById("myModalAvatar");
var kickModal = document.getElementById("myModalKick");
var btn = document.getElementById("myBtn");
// Gets the close button of the modal.
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];
// When the user clicks the button, we open the modal.
btn.onclick = function() {
		modal.style.display = "block";
	}

span.onclick = function() {
	modal.style.display = "none";
}
span2.onclick = function() {
	avatarModal.style.display = "none";
}
span3.onclick = function() {
		kickModal.style.display = "none";
	}

submitBtn.onclick = function() {
		guardarname();
		$("#myBtn").text("Joined as " + nameInput.value);
		console.log(nameInput.value);
		modal.style.display = "none";
	}

kickBtn.onclick = function() {
	console.log(kickName.value);
	modal.style.display = "none";
	kickUser();
}
window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	}
}

function openKickModal(name) {
	document.getElementById("myModalKick").style.display = "block";
	$('#kickName').val(name);
}


var form = $("#formAvatar");
var btnEnviar = $("#myBtnAvatar");
document.getElementById("myBtnAvatar").addEventListener("click", function() {
	document.getElementById("myModalAvatar").style.display = "block";
});

form.on("submit", function(e) {
	e.preventDefault();
	btnEnviar.attr("disabled", true);
	var data = new FormData(form[0]);
	data.append("imagen", $("#imagen")[0].files[0]);
	data.append("nameAvatar", $("#nameAvatar").val());

	$.ajax({
		type: "POST",
		url: "save_avatar.php",
		data: data,
		processData: false,
		contentType: false,
		success: function(data) {
			console.log(data);
		},
		error: function(xhr, textStatus, errorThrown) {
			alert('Error to send/save image :( ');
			console.error("Error al enviar la imagen: " + textStatus);
		},
		complete: function() {
			document.getElementById("myModalAvatar").style.display = "none";
			btnEnviar.attr("disabled", false);
			location.reload();
		}
	});
});

function confetiFall() {
	var confites = document.getElementById("confites");
	var colores = ["#f3c518", "#e83c77", "#007bff", "#28a745", "#6f42c1", "#fd7e14"]; // Add colors to matrix
	for(var i = 0; i < 550; i++) {
		var confite = document.createElement("div");
		confite.classList.add("confite");
		confite.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)]; // Assign a color to each one
		confite.style.left = Math.random() * 100 + "%";
		confite.style.top = Math.random() * 100 + "%";
		confite.style.animationDelay = Math.random() * 2 + "s";
		confites.appendChild(confite);
	}
}