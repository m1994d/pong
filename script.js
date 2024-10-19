// Variables de la pelota
let pelotaX, pelotaY, velocidadPelotaX, velocidadPelotaY, diametroPelota;

// Variables de las raquetas
let raquetaJugadorY, raquetaComputadoraY, anchoRaqueta, altoRaqueta;
let velocidadRaquetaComputadora;

// Dimensiones del juego
let anchoCanvas = 600;
let altoCanvas = 400;

// Puntajes
let puntajeJugador = 0;
let puntajeComputadora = 0;
let maxPuntos = 5; // Puntos máximos para finalizar la partida

// Control de velocidad
let incrementoVelocidad = 0.2; // Incremento menor para evitar que se descontrole
let maxVelocidadPelota = 8; // Velocidad máxima de la pelota
let puntosParaIncrementar = 3; // Cada cuántos puntos se incrementará la velocidad
let puntosDesdeUltimoIncremento = 0; // Contador de puntos

// Control de teclas
let teclaArribaPresionada = false;
let teclaAbajoPresionada = false;

// Estado de la partida
let partidaFinalizada = false;
let botonReinicio;

function setup() {
  // Crear el lienzo
  createCanvas(anchoCanvas, altoCanvas);

  // Pedir al jugador que elija el número máximo de puntos
  maxPuntos = int(prompt("Introduce el número de puntos para finalizar la partida:"));

  // Posición inicial de la pelota
  pelotaX = width / 2;
  pelotaY = height / 2;
  diametroPelota = 20;

  // Velocidad inicial de la pelota
  velocidadPelotaX = 5;
  velocidadPelotaY = 3;

  // Dimensiones de las raquetas
  anchoRaqueta = 8;
  altoRaqueta = 100;

  // Posición inicial de la raqueta del jugador
  raquetaJugadorY = height / 2 - altoRaqueta / 2;

  // Posición inicial de la raqueta de la computadora
  raquetaComputadoraY = height / 2 - altoRaqueta / 2;
  velocidadRaquetaComputadora = 4;

  // Crear botón para reiniciar la partida, pero inicialmente oculto
  botonReinicio = createButton('Nueva Partida');
  botonReinicio.position(width / 2 - 50, height / 2 + 50); // Centrar el botón
  botonReinicio.mousePressed(reiniciarJuego); // Función que se ejecutará al hacer clic en el botón
  botonReinicio.hide(); // Esconder el botón hasta que sea necesario
}

function draw() {
  // Verificar si la partida ha finalizado
  if (partidaFinalizada) {
    // Mostrar mensaje de fin de partida
    background(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255, 0, 0);
    text("¡Partida Finalizada!", width / 2, height / 2 - 50);
    textSize(32);
    text(`Jugador: ${puntajeJugador}, Computadora: ${puntajeComputadora}`, width / 2, height / 2 + 20);

    // Mostrar el botón para iniciar una nueva partida
    botonReinicio.show();
    return;
  }

  // Fondo negro
  background(0);

  // Texto "MadTech" en el fondo del tablero de juego
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(50, 550, 80, 30); // Color a elección y semi-transparente
  text("MadTech", width / 2, height / 2);

  // Dibujar la pelota
  fill(255);
  ellipse(pelotaX, pelotaY, diametroPelota, diametroPelota);

  // Dibujar las raquetas
  rect(20, raquetaJugadorY, anchoRaqueta, altoRaqueta); // Raqueta del jugador
  rect(width - 30, raquetaComputadoraY, anchoRaqueta, altoRaqueta); // Raqueta de la computadora

  // Mover la pelota
  pelotaX += velocidadPelotaX;
  pelotaY += velocidadPelotaY;

  // Rebote de la pelota en los bordes superior e inferior
  if (pelotaY <= 0 || pelotaY >= height) {
    velocidadPelotaY *= -1;
  }

  // Colisión con la raqueta del jugador
  if (pelotaX <= 30 && pelotaY >= raquetaJugadorY && pelotaY <= raquetaJugadorY + altoRaqueta) {
    velocidadPelotaX *= -1;
  }

  // Colisión con la raqueta de la computadora
  if (pelotaX >= width - 30 && pelotaY >= raquetaComputadoraY && pelotaY <= raquetaComputadoraY + altoRaqueta) {
    velocidadPelotaX *= -1;
  }

  // Rebote de la pelota fuera de las raquetas (punto para computadora o jugador)
  if (pelotaX <= 0) {
    puntajeComputadora++;
    puntosDesdeUltimoIncremento++;
    ajustarVelocidadPelota();
    reiniciarPelota();
    verificarFinDePartida(); // Verificar si la partida debe finalizar
  }
  if (pelotaX >= width) {
    puntajeJugador++;
    puntosDesdeUltimoIncremento++;
    ajustarVelocidadPelota();
    reiniciarPelota();
    verificarFinDePartida(); // Verificar si la partida debe finalizar
  }

  // Mover la raqueta del jugador con el mouse
  raquetaJugadorY = mouseY - altoRaqueta / 2;

  // Mover la raqueta del jugador con teclas (W y S)
  if (teclaArribaPresionada && raquetaJugadorY > 0) {
    raquetaJugadorY -= 5;
  }
  if (teclaAbajoPresionada && raquetaJugadorY < height - altoRaqueta) {
    raquetaJugadorY += 5;
  }

  // Mover la raqueta de la computadora
  if (pelotaY < raquetaComputadoraY) {
    raquetaComputadoraY -= velocidadRaquetaComputadora;
  } else if (pelotaY > raquetaComputadoraY + altoRaqueta) {
    raquetaComputadoraY += velocidadRaquetaComputadora;
  }

  // Dibujar el puntaje
  fill(255);
  textSize(32);
  text(puntajeJugador, width / 4, 50);
  text(puntajeComputadora, 3 * width / 4, 50);
}

// Función para verificar si la partida debe finalizar
function verificarFinDePartida() {
  if (puntajeJugador >= maxPuntos || puntajeComputadora >= maxPuntos) {
    partidaFinalizada = true;
  }
}

function reiniciarPelota() {
  pelotaX = width / 2;
  pelotaY = height / 2;
  velocidadPelotaX *= -1; // Cambia la dirección de la pelota
}

// Aumentar la velocidad de la pelota tras cada pocos puntos
function ajustarVelocidadPelota() {
  if (puntosDesdeUltimoIncremento >= puntosParaIncrementar) {
    if (Math.abs(velocidadPelotaX) < maxVelocidadPelota) {
      velocidadPelotaX += (velocidadPelotaX > 0) ? incrementoVelocidad : -incrementoVelocidad;
    }
    if (Math.abs(velocidadPelotaY) < maxVelocidadPelota) {
      velocidadPelotaY += (velocidadPelotaY > 0) ? incrementoVelocidad : -incrementoVelocidad;
    }
    puntosDesdeUltimoIncremento = 0; // Reinicia el contador
  }
}

// Detectar cuando se presionan o sueltan las teclas W y S
function keyPressed() {
  if (key === 'W' || key === 'w') {
    teclaArribaPresionada = true;
  } else if (key === 'S' || key === 's') {
    teclaAbajoPresionada = true;
  }
}

function keyReleased() {
  if (key === 'W' || key === 'w') {
    teclaArribaPresionada = false;
  } else if (key === 'S' || key === 's') {
    teclaAbajoPresionada = false;
  }
}

// Función para reiniciar el juego completamente
function reiniciarJuego() {
  puntajeJugador = 0;
  puntajeComputadora = 0;
  velocidadPelotaX = 5;
  velocidadPelotaY = 3;
  partidaFinalizada = false;
  puntosDesdeUltimoIncremento = 0;

  // Esconder el botón de reinicio
  botonReinicio.hide();
}