import Game from "./game";

document.addEventListener('DOMContentLoaded', () => {
  let game = new Game();
  game.renderInitialState();
  window.addEventListener("keypress", restart);

  function restart(e){
    if (e.keyCode === 13 && game.gameOver) {
      game = new Game();
      game.runGame();
    }
  }
});
