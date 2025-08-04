const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  psychic: '#f85888',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  fairy: '#ee99ac',
  normal: '#a8a878',
  fighting: '#c03028',
  flying: '#a890f0',
  poison: '#a040a0',
  ground: '#e0c068',
  rock: '#b8a038',
  bug: '#a8b820',
  ghost: '#705898',
  steel: '#b8b8d0'
};

async function fetchPokemon() {
  const pokemonName = document.getElementById("pokemonInput").value.toLowerCase();
  const container = document.getElementById("pokemonContainer");
  container.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    // Datos relevantes
    const name = data.name;
    const image = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
    const height = data.height / 10; // metros
    const weight = data.weight / 10; // kg
    const baseXP = data.base_experience;
    const types = data.types.map(t => t.type.name);
    const abilities = data.abilities.map(a => a.ability.name).join(', ');
    const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`);

    // Color del tipo principal
    const cardColor = typeColors[types[0]] || "#ddd";

    // Crear tarjeta HTML
    container.innerHTML = `
      <div class="pokemon-card" style="border-top: 10px solid ${cardColor}">
        <img src="${image}" alt="${name}" class="pokemon-card__image"/>
        <h2 class="pokemon-card__name">${name}</h2>
        <div class="pokemon-card__info">Altura: ${height} m</div>
        <div class="pokemon-card__info">Peso: ${weight} kg</div>
        <div class="pokemon-card__info">Experiencia base: ${baseXP}</div>
        <div class="pokemon-card__info pokemon-card__types">
          Tipos: ${types.map(type => `<span style="background-color:${typeColors[type] || '#ccc'}">${type}</span>`).join(' ')}
        </div>
        <div class="pokemon-card__abilities">Habilidades: ${abilities}</div>
        <div class="pokemon-card__stats">
          <strong>Estadísticas base:</strong>
          ${stats.map(stat => `<div>${stat}</div>`).join('')}
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<p>No se encontró el Pokémon. Intenta con otro nombre.</p>`;
  }
}
console.log("Hola mundo");