let anchoCanvas = 800;
let altoCanvas = 400;

let jugadorX = 15;
let jugadorY;
let anchoRaqueta = 10;
let altoRaqueta = 100;

let computadoraX = anchoCanvas - 25;
let computadoraY;

let pelotaX, pelotaY;
let diametroPelota = 20;
let velocidadPelotaX = 5;
let velocidadPelotaY = 5;
let anguloPelota = 0;

let grosorMarco = 10; //Margen del limite de juego

let jugadorScore = 0; // Marcador Jugador
let computadoraScore = 0; // Marcador Computadora
let puntosMaximos; // Nuevo: variable para el límite de puntos
let partidaEnCurso = false; // Para controlar el estado del juego

let fondo; // Foondo de juego en partida
let fondoInicio; // Nuevo: imagen de fondo para la pantalla de inicio
let barraJugador; //Raqueta o barra del Jugador
let barraComputadora; //Raqueta o barra de la computadora
let bola;
let sonidoRebote;
let sonidoGol;

function preload() {
    fondo = loadImage('asddf-01.png'); // Foondo de juego en partida
    fondoInicio = loadImage('fondo1.png'); // Nuevo: Cargar la imagen de fondo para la pantalla de inicio
    barraJugador = loadImage('barra1.png');
    barraComputadora = loadImage('barra2.png');
    bola = loadImage('bola.png');
    sonidoRebote = loadSound('bounce.wav');
    sonidoGol = loadSound('jingle_win_synth_02.wav');
}

function setup() {
    createCanvas(anchoCanvas, altoCanvas);
    jugadorY = height / 2 - altoRaqueta / 2;
    computadoraY = height / 2 - altoRaqueta / 2;
    
    // Crear un botón para iniciar la partida
    let botonIniciar = createButton('Iniciar Partida');
    botonIniciar.position(20, altoCanvas + 20);
    botonIniciar.mousePressed(iniciarPartida);
    
    // Crear un botón para finalizar la partida
    let botonFinalizar = createButton('Finalizar Partida');
    botonFinalizar.position(150, altoCanvas + 20);
    botonFinalizar.mousePressed(finalizarPartida);
}

function draw() {
    if (!partidaEnCurso) {
        // Dibuja el fondo de inicio cuando no hay partida en curso
        background(fondoInicio);
        
        textSize(32);
        textAlign(CENTER, CENTER);

        // Añadir borde "neón" al texto
        stroke(100, 15, 155); // Color neón (azul cian)
        strokeWeight(4); // Grosor del borde
        fill(255); // Color del texto (blanco)

        text("Introduce los puntos y presiona Iniciar Partida", width / 2, height / 2);
        return;
    }

    background(fondo);
    dibujarMarcos();
    dibujarRaquetas();
    dibujarPelota();
    mostrarPuntaje();
    moverPelota();
    moverComputadora();
    verificarColisiones();
}


function iniciarPartida() {
    // Pedir los puntos máximos al usuario
    puntosMaximos = prompt("¿A cuántos puntos deseas jugar?");
    
    if (puntosMaximos != null && !isNaN(puntosMaximos) && puntosMaximos > 0) {
        jugadorScore = 0;
        computadoraScore = 0;
        partidaEnCurso = true;
        resetPelota();
    } else {
        alert("Por favor, introduce un número válido de puntos.");
    }
}

function finalizarPartida() {
    partidaEnCurso = false;
}

function dibujarMarcos() {
    fill(color("#2B3FD6"));
    rect(0, 0, width, grosorMarco); // Marco superior
    rect(0, height - grosorMarco, width, grosorMarco); // Marco inferior
}

function dibujarRaquetas() {
    image(barraJugador, jugadorX, jugadorY, anchoRaqueta, altoRaqueta);
    image(barraComputadora, computadoraX, computadoraY, anchoRaqueta, altoRaqueta);
}

function dibujarPelota() {
    push();
    translate(pelotaX, pelotaY);
    rotate(anguloPelota);
    imageMode(CENTER);
    image(bola, 0, 0, diametroPelota, diametroPelota);
    pop();
}

function mostrarPuntaje() {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(color("#fffff"));
    text(jugadorScore, width / 4, grosorMarco * 3);
    text(computadoraScore, 3 * width / 4, grosorMarco * 3);
}

function moverPelota() {
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    let velocidadTotal = sqrt(velocidadPelotaX * velocidadPelotaX + velocidadPelotaY * velocidadPelotaY);
    anguloPelota += velocidadTotal * 0.05;

    if (pelotaY - diametroPelota / 2 < grosorMarco || 
        pelotaY + diametroPelota / 2 > height - grosorMarco) {
        velocidadPelotaY *= -1;
    }
}

function moverComputadora() {
    if (pelotaY > computadoraY + altoRaqueta / 2) {
        computadoraY += 4;
    } else if (pelotaY < computadoraY + altoRaqueta / 2) {
        computadoraY -= 4;
    }
    computadoraY = constrain(computadoraY, grosorMarco, height - grosorMarco - altoRaqueta);
}

function verificarColisiones() {
    if (pelotaX - diametroPelota / 2 < jugadorX + anchoRaqueta && 
        pelotaY > jugadorY && pelotaY < jugadorY + altoRaqueta) {
        let puntoImpacto = pelotaY - (jugadorY + altoRaqueta / 2);
        let factorAngulo = (puntoImpacto / (altoRaqueta / 2)) * PI / 3;
        velocidadPelotaY = 10 * sin(factorAngulo);
        velocidadPelotaX *= -1;
        sonidoRebote.play();
    }

    if (pelotaX + diametroPelota / 2 > computadoraX && 
        pelotaY > computadoraY && pelotaY < computadoraY + altoRaqueta) {
        let puntoImpacto = pelotaY - (computadoraY + altoRaqueta / 2);
        let factorAngulo = (puntoImpacto / (altoRaqueta / 2)) * PI / 3;
        velocidadPelotaY = 10 * sin(factorAngulo);
        velocidadPelotaX *= -1;
        sonidoRebote.play();
    }

    if (pelotaX < 0) {
        computadoraScore++;
        sonidoGol.play();
        narrarMarcador();
        resetPelota();
        verificarFinPartida();
    } else if (pelotaX > width) {
        jugadorScore++;
        sonidoGol.play();
        narrarMarcador();
        resetPelota();
        verificarFinPartida();
    }
}

function verificarFinPartida() {
    if (jugadorScore >= puntosMaximos || computadoraScore >= puntosMaximos) {
        partidaEnCurso = false;
        alert(`Partida finalizada. Ganador: ${jugadorScore > computadoraScore ? 'Jugador' : 'Computadora'}`);
    }
}

function narrarMarcador() {
    let narrador = new SpeechSynthesisUtterance(`El marcador es ${jugadorScore} a ${computadoraScore}`);
    window.speechSynthesis.speak(narrador);
}

function resetPelota() {
    pelotaX = width / 2;
    pelotaY = height / 2;
    velocidadPelotaX = 5 * (Math.random() > 0.5 ? 1 : -1);
    velocidadPelotaY = 5 * (Math.random() > 0.5 ? 1 : -1);
    anguloPelota = 0;
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        jugadorY -= 50;
    } else if (keyCode === DOWN_ARROW) {
        jugadorY += 50;
    }
    jugadorY = constrain(jugadorY, grosorMarco, height - grosorMarco - altoRaqueta);
}
