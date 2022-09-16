const arrayPalabras = [
  "sistema",
  "ordenador",
  "laptop",
  "perro",
  "gallo",
  "cereza",
  "platano",
  "manzana",
  "cereza",
  "relampago",
  "jirafa",
  "colegio",
  "hospital",
  "mermelada",
  "pastel",
];

String.prototype.replaceAt = function (index, character) {
  return (
    this.substring(0, index) +
    character +
    this.substring(index + character.length)
  );
}; //funcion no nativa

let cantidadErrores = 0;
let cantidadAciertos = 0;

const tamañoArrayPalabras = arrayPalabras.length; //calculamos la cantidad de palabras dentro del array

const palabraJugar =
  arrayPalabras[Math.floor(Math.random() * tamañoArrayPalabras)]; //seleccionamos una palabra del array de manera aleatoria

let palabraOculta = palabraJugar.replace(/./g, "_ "); //reemplazamos la palabra con subguiones

const palabraJugada = document.getElementById("palabraJugada");
const imagenAhorcado = document.getElementById("imagenAhorcado");

const buttonLetra = document.getElementById("letra");
const buttonRefresh = document.getElementById("refreshGame");
palabraJugada.innerHTML = palabraOculta; //pintamos los guiones de la palabra seleccionada

buttonLetra.addEventListener("click", (e) => {
  e.preventDefault();
  let letraIngresada = document.getElementById("letraIngresada").value;
  letraIngresada = letraIngresada.toLowerCase(); //convertimos a minusculas las letras ingresadas para evitar errores

  let acierto = false;
  for (const i in palabraJugar) {
    if (letraIngresada == palabraJugar[i]) {
      //se verifica si la letra ingresada pertenece a la palabra a adivinar
      palabraOculta = palabraOculta.replaceAt(i * 2, letraIngresada); //se reemplaza el subguión con la letra
      acierto = true;
      cantidadAciertos = cantidadAciertos + 1;
    }
  }

  if (acierto == false) {
    cantidadErrores = cantidadErrores + 1;
    const sourceImage = `images/img${cantidadErrores}.png`; //para alternar las imagenes del ahorcado
    imagenAhorcado.src = sourceImage;
    if (cantidadErrores == 7) {
      alert("PERDIÓ :(");
      buttonLetra.style.display = "none";
      buttonRefresh.style.display = "inline-block";
    } 

  }
  if (palabraOculta.indexOf('_') < 0) {
    alert("GANASTE");
    buttonLetra.style.display = "none";
    buttonRefresh.style.display = "inline-block";
  }
  palabraJugada.innerHTML = palabraOculta; //reemplazamos lo guiones segun las letras ingresadas
  letraIngresada.value = "";
});
