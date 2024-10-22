# 🎮 Juego Pong Clásico con p5.js

Este proyecto es una implementación del juego clásico de **Pong** utilizando la biblioteca **p5.js**. El juego es una versión de un jugador donde el objetivo es ganar contra la computadora alcanzando primero el número de puntos preestablecido.

## 🚀 Características

- **Pantalla de inicio personalizada**: Antes de comenzar la partida, se solicita al jugador que introduzca cuántos puntos desea jugar para finalizar la partida.
- **Fondo personalizado**: En la pantalla de inicio se muestra una imagen de fondo (`fondo1.png`).
- **Colisión con las raquetas**: La pelota puede rebotar tanto en la raqueta del jugador como en la de la computadora con un ángulo dinámico basado en el punto de impacto.
- **Marcador y narrador del puntaje**: El marcador se actualiza en pantalla y una voz narrará el puntaje actual a través de la API de síntesis de voz del navegador.
- **Sonidos**: Se incluyen sonidos de rebote y anotación para una experiencia más inmersiva.
- **Movimiento de la computadora**: La raqueta de la computadora se mueve automáticamente en función de la posición de la pelota.

## 📂 Archivos del proyecto

- `index.html`: Contiene la estructura HTML básica y la inclusión de los scripts de p5.js.
- `sketch.js`: El archivo principal que contiene el código del juego.
- `fondo1.png`: Imagen utilizada como fondo en la pantalla de inicio.
- `asddf-01.png`: Imagen de fondo para el área de juego.
- `barra1.png` y `barra2.png`: Imágenes de las raquetas del jugador y la computadora.
- `bola.png`: Imagen de la pelota.
- `bounce.wav` y `jingle_win_synth_02.wav`: Sonidos utilizados en el juego (rebote y gol).

## 🛠 Requisitos

- Para ejecutar este juego, necesitas tener **p5.js** incluido en tu archivo HTML.
- Puedes descargar la biblioteca desde [p5.js](https://p5js.org/).

## 🎮 Cómo jugar

1. Al iniciar el juego, se mostrará una pantalla de inicio con la imagen de fondo y el mensaje: "Introduce los puntos y presiona Iniciar Partida".
2. Haz clic en el botón **"Iniciar Partida"**. Se te pedirá que ingreses cuántos puntos deseas jugar. Introduce un número válido.
3. El juego comenzará, y el jugador controlará la raqueta de la izquierda usando las teclas **Arriba** y **Abajo** del teclado.
4. La computadora controlará automáticamente la raqueta de la derecha.
5. El primer jugador en alcanzar los puntos especificados ganará la partida.
6. Una vez finalizada la partida, puedes hacer clic en **"Finalizar Partida"** para volver a la pantalla de inicio y comenzar una nueva partida.

## 🎮 Controles

- **Tecla de Flecha Arriba (↑)**: Mueve la raqueta del jugador hacia arriba.
- **Tecla de Flecha Abajo (↓)**: Mueve la raqueta del jugador hacia abajo.
- **Botón "Iniciar Partida"**: Inicia una nueva partida.
- **Botón "Finalizar Partida"**: Finaliza la partida actual y regresa a la pantalla de inicio.

## 📌 Notas

- La velocidad de la pelota y los ángulos de rebote están calculados en función del punto de impacto en la raqueta.
- El juego está diseñado para reiniciarse automáticamente cuando se alcanza el número de puntos ingresado.

## 🛠 Tecnologías utilizadas

- **p5.js**: Para la creación y manipulación de elementos gráficos y sonido.
- **JavaScript**: Lógica del juego y control de eventos.
- **HTML/CSS**: Estructura y estilos del proyecto.

## 👤 Autor

Este proyecto fue desarrollado por **Marlon**, un programador web que está creando una versión clásica del juego Pong utilizando p5.js.
