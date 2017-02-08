document.addEventListener('DOMContentLoaded', event => {
	const game = new Engine.Game(document.getElementById('gameCanvas'), false);
	game.changeScreen(Game.Screens.Splash);
	game.play();
});
