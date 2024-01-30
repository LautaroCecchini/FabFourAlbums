window.onload = function() {
	prepararBotonesCategorias();
}

/*Funciones preparatorias*/

function prepararBotonesCategorias() {
	var botones = document.getElementById("categorias").children;
	for (var i=0; i < botones.length; i++) {
		botones[i].onclick = function() {
			activar(this);
		}	
	}
}

function prepararBotonesPortadas() {
	var botones = document.getElementsByClassName("info");
	for (var i = 0; i < botones.length; i++) {
		botones[i].onclick = function () {
			insertarContenido(this);
		}
	}
}

function prepararContenido(set_chosen) {
	set_actual = set_chosen;
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

function insertarPortadas(set_chosen) {
    var marcos = document.getElementsByClassName("marco");

    for (var i = 0; i < marcos.length; i++) {
        var marco = marcos[i];
        var pie = document.getElementsByClassName("pie")[i];
        var imagen = document.createElement("img");

        imagen.setAttribute("class", "portada capa3");
        imagen.setAttribute("src", set_chosen[i]);

        marco.insertBefore(imagen, pie);
		
		/*Las siguientes líneas se encargan de la animación de fade-in*/
		
		(function(imagen) { /*Esto que acabo de abrir se llama Immediately Invoked Function Expression (IIFE) y sirve para ejecutar una función
			justo después de declararla. Estoy encerrando la función setTimeout en una IIFE para ejecutar la aplicación de la clase a cada
			valor de "imagen" dentro del loop, sin que se genere comportamiento no deseado causado porque función setTimeout está dentro de
			un bucle for. Sin este IIFE, el efecto deseado solamente se aplica al último elemento llamado por el bucle.*/
			
			setTimeout(function() {	/*Función para retrasar el efecto por 10 milisegundos para evitar comportamiento no deseado*/
				imagen.classList.add("fade-in-active"); /*La lista de clases de un elemento es un objeto llamado classList*/
		}, 10);
		})(imagen); /*Con esta línea le paso el parámetro "imagen" a tooooda esta función anónima que acabo de definir. Es una resolución complicada,
	    		   pero no tengo ganas de pensarlo de otra forma (la idea fue de Chat GPT)*/
    }
}

/*Función hecha con la ayuda de ChatGPT. Según la entiendo, es la misma función que definí arriba, sólo que dentro de un
bucle for que itera sobre cada uno de los marcos. De esta forma, se ejecuta cuatro veces y le da a cada marco su portada
correspondiente. ¡Fascinante! Voy a dejar el proceso registrado, ya que esto son como mis apuntes.*/

/*¡Éxito! Ahora que pude añadir efecto de transición a las imágenes, no debería costarme demasiado hacerlo con el contenido*/

function insertarInfo(set_chosen) {
	var marcos = document.getElementsByClassName("marco");
	infos.length = 0; /*Reinicia el array a 0 cada vez que clickeo una categoría*/
	
	for (var i = 0; i < marcos.length; i++) {
		var marco = marcos[i];
		var pie = document.getElementsByClassName("pie")[i];
		var info = document.createElement("div");
		infos.push(info); /*Inserto cada div en el array para que tengan un índice correspondiente a su orden, que voy a usar luego en la función "insertarContenido"*/
		info.setAttribute("class", "info capa2");
		
		var artista = document.createElement("p");
		var artista_txt = document.createTextNode(set_chosen[i][0]);
		artista.setAttribute("class", "artista");
		artista.appendChild(artista_txt);
		
		var titulo = document.createElement("p");
		var titulo_txt = document.createTextNode(set_chosen[i][1]);
		titulo.setAttribute("class", "titulo");
		titulo.appendChild(titulo_txt);
		
		info.appendChild(artista);
		info.appendChild(titulo);
		
		marco.insertBefore(info, pie);
		prepararBotonesPortadas();
	}
}

/* Para insertar contenido voy a tener que aprender a usar el objeto "XMLHttpRequest", así que iré dejando anotaciones en el proceso */

function probarContenido() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() { /* Acá hay algo que no entiendo. ¿Cómo le cambia el readyState al objeto? */
		if (this.readyState == 4 && this.status == 200) { /* Esto quiere decir: "si la propiedad readyState de este objeto es 4 (el pedido fue hecho y la respuesta está lista) y la propiedad status es 200 (todo está bien)..." */
			var contenedor = document.getElementById("prueba");
			contenedor.innerHTML = this.responseText; /*Estas líneas insertan el contenido a través del método innerHTML, que sirve para insertar grandes trozos de markup. */
		}
	};
	
	request.open("GET", "https://raw.githubusercontent.com/LautaroCecchini/FabFourAlbums/main/external-content/test.html?token=GHSAT0AAAAAACNN3TVWDN3OLQXQSVOCB2TQZNVKNPQ");
	/* El método open recibe dos parámetros obligatorios: el tipo de pedido (en este caso "GET") y la ubicación del archivo */
	request.send(); /* Y esto ejecuta el pedido */
}

/* Esta función no va a ser llamada, pero queda ahí escrita como referencia. Ahora tengo que escribir la función 
para insertar el contenido correspondiente a cada álbum */

function insertarContenido(album_chosen) { /* Para esta función creé un array variable llamado "infos" al que voy a manipular dentro de la función "insertarInfo" */
	var album_index = infos.indexOf(album_chosen);
	for (i = 0; i < set_actual.length; i++) {
		if (album_index != i) {
			continue;
		} else {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var contenedor = document.getElementById("contenido");
					contenedor.innerHTML = this.responseText;
					var contenido = contenedor.querySelector("div");

					if(!contenedor.hasAttribute("data-inserted")) { //Si el contenedor no tiene el atributo "data-inserted"...
						setTimeout(function() {
							contenido.classList.add("fade-in-active");
						}, 10);

						contenedor.setAttribute("data-inserted", true); //... hacer animación y crear el atributo "data-inserted".
					} else {
						contenido.classList.add("fade-in-active"); //Si no, añadir la clase sin delay (y por lo tanto sin animación)
					}
				}
			};
			
			request.open("GET", set_actual[i]);
			request.send();
		}
	}
}

/* */

/*Array y variable móviles*/

var infos = [];
var set_actual = null;

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
var set_espacio_contenido = [
"external-content/Titanic_Rising.html",
"external-content/Floating_Into_The_Night.html",
"external-content/Hounds_of_Love.html",
"external-content/Infections_of_a_Different_Kind.html"
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
	var contenedor = document.getElementById("contenido");
	contenedor.innerHTML = " ";
	
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
		prepararContenido(set_espacio_contenido);
	}
	
	else if (category == "italian-shoes") {
		insertarPortadas(set_italian_shoes_portadas);
		insertarInfo(set_italian_shoes_info);
	}
	
	descripcion.style.display = "none";
}
