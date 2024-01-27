window.onload = function() {
	prepararBotones();
	probarContenido();
}

/*Funciones preparatorias*/

function prepararBotones() {
	var botones = document.getElementById("categorias").children;
	for (var i=0; i < botones.length; i++) {
		botones[i].onclick = function() {
			activar(this);
		}	
	}
}

/* */

/* Funciones para insertar/cambiar contenido */

/*function insertarPortada() {
	var marco = document.getElementById("marco");
	var pie = document.getElementById("pie");
	var imagen = document.createElement("img");
	imagen.setAttribute("class", "portada capa2");
	imagen.setAttribute("src", "images/covers/0.gif");
	marco.insertBefore(imagen, pie);
}*/

/*Bien, esto funciona. Ahora, voy a tratar de definir una función para insertar las cuatro portadas
usando esta como referencia.*/

function insertarPortadas(set_chosen_covers) {
    var marcos = document.getElementsByClassName("marco");

    for (var i = 0; i < marcos.length; i++) {
        var marco = marcos[i];
        var pie = document.getElementsByClassName("pie")[i];
        var imagen = document.createElement("img");

        imagen.setAttribute("class", "portada capa3");
        imagen.setAttribute("src", set_chosen_covers[i]);

        marco.insertBefore(imagen, pie);
    }
}

/*Función hecha con la ayuda de ChatGPT. Según la entiendo, es la misma función que definí arriba, sólo que dentro de un
bucle for que itera sobre cada uno de los marcos. De esta forma, se ejecuta cuatro veces y le da a cada marco su portada
correspondiente. ¡Fascinante! Voy a dejar el proceso registrado, ya que esto son como mis apuntes.*/

function insertarInfo(set_chosen_info) {
	var marcos = document.getElementsByClassName("marco");
	
	for (var i = 0; i < marcos.length; i++) {
		var marco = marcos[i];
		var pie = document.getElementsByClassName("pie")[i];
		var info = document.createElement("div");
		info.setAttribute("class", "info capa2");
		
		var artista = document.createElement("p");
		var artista_txt = document.createTextNode(set_chosen_info[i][0]);
		artista.setAttribute("class", "artista");
		artista.appendChild(artista_txt);
		
		var titulo = document.createElement("p");
		var titulo_txt = document.createTextNode(set_chosen_info[i][1]);
		titulo.setAttribute("class", "titulo");
		titulo.appendChild(titulo_txt);
		
		info.appendChild(artista);
		info.appendChild(titulo);
		
		marco.insertBefore(info, pie);
	}
}

/* Para insertar contenido voy a tener que aprender a usar el objeto "XMLHttpRequest", así que iré dejando anotaciones en el proceso */

function probarContenido() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() { /* Acá hay algo que no entiendo. ¿Cómo le cambia el readyState al objeto? */
		if (this.readyState == 4 && this.status == 200) { /* Esto quiere decir: "si la propiedad readyState de este objeto es 4 (el pedido fue hecho y la respuesta está lista) y la propiedad status es 200 (todo está bien)..." */
			console.log(this.responseText);
		}
	};
	
	request.open("GET", "external-content/test.txt", true);
	request.send();
	
}
		
/* */

/*Arrays de los sets*/

var set_shoegaze_portadas = ["images/covers/So Tonight That I Might See.gif", "images/covers/Excursiones.gif", "images/covers/Soft Sounds from Another Planet.gif", "images/covers/The Archer.gif"];
var set_shoegaze_info = [
["Mazzy Star", "So Tonight That I Might See"], 
["Suarez", "Excursiones"], 
["Japanese Breakfast", "Soft Sounds from Another Planet"], 
["Alexandra Savior", "The Archer"]
]

var set_madera_portadas = ["images/covers/The Car.gif", "images/covers/Five Leaves Left.gif", "images/covers/0.gif", "images/covers/Kamikaze.gif"];
var set_madera_info = [
["Arctic Monkeys", "The Car"], 
["Nick Drake", "Five Leaves Left"], 
["Ichiko Aoba", "0"], 
["Luis A. Spinetta", "Kamikaze"]
]

var set_espacio_portadas = ["images/covers/Titanic Rising.gif", "images/covers/Floating Into The Night.gif", "images/covers/Hounds of Love.gif", "images/covers/Infections of a Different Kind.gif"]
var set_espacio_info = [
["Weyes Blood", "Titanic Rising"],
["Julee Cruise", "Floating Into The Night"],
["Kate Bush", "Hounds of Love"],
["Aurora", "Infections of a Different Kind (Step 1)"]
]

var set_italian_shoes_portadas = ["images/covers/Tranquility Base Hotel & Casino.gif", "images/covers/Daddy's Home.gif", "images/covers/Parte De La Religión.gif", "images/covers/Blossom Dearie.gif"]
var set_italian_shoes_info = [
["Arctic Monkeys", "Tranquility Base Hotel & Casino"],
["St. Vincent", "Daddy's Home"],
["Charly García", "Parte De La Religión"],
["Blossom Dearie", "Blossom Dearie"]
]

/* */

function activar(boton) {
	var category = boton.getAttribute("id");
	var placeholders = document.getElementsByClassName("placeholder");
	var descripcion = document. getElementById("descripcion");
	
	if (category == "shoegaze") {
		insertarPortadas(set_shoegaze_portadas);
		insertarInfo(set_shoegaze_info);
	}
	
	else if (category == "madera") {
		insertarPortadas(set_madera_portadas);
		insertarInfo(set_madera_info);
	}
	
	else if (category == "espacio") {
		insertarPortadas(set_espacio_portadas);
		insertarInfo(set_espacio_info);
	}
	
	else if (category == "italian-shoes") {
		insertarPortadas(set_italian_shoes_portadas);
		insertarInfo(set_italian_shoes_info);
	}
	
	descripcion.style.display = "none";
}