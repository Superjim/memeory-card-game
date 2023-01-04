# Memory Card Game

:point_right:[Live Demo](https://superjim-pokemon-memory.netlify.app/)

This project is using React hooks (useEffect and useState) to create a simple memory game. The game loads data for 151 Pokemon from an API (getPokemon function) and displays the data as a set of cards for the user to interact with. 

The user can select a difficulty level, and then start a new game, which shuffles and selects a subset of the Pokemon data to display on the cards. The user can then try to click on each card only once, trying to remember which cards have already been clicked. 

If the user clicks on a card that has already been clicked, the game ends and displays a "Game Over" screen. If the user successfully clicks on all cards without repeating any, the game ends and displays a "You Win" screen. The game also keeps track of the user's score and the highest score achieved so far.

Built with [PokeAPI](https://pokeapi.co/)
