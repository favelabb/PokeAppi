document.addEventListener('DOMContentLoaded', () => {
    const pokeCard = document.querySelector('[data-poke-card]');
    const pokeName = document.querySelector('[data-poke-name]');
    const pokeImg = document.querySelector('[data-poke-img]');
    const pokeId = document.querySelector('[data-poke-id]');
    const pokeTypes = document.querySelector('[data-poke-types]');
    const pokeHeight = document.querySelector('[data-poke-height]');
    const pokeWeight = document.querySelector('[data-poke-weight]');
    const pokeStats = document.querySelector('[data-poke-stats]');

    const typeColors = {
        electric: '#FFEA70',
        normal: '#B09398',
        fire: '#FF675C',
        water: '#0596C7',
        ice: '#AFEAFD',
        rock: '#999799',
        flying: '#7AE7C7',
        grass: '#4A9681',
        psychic: '#FFC6D9',
        ghost: '#561D25',
        bug: '#A2FAA3',
        poison: '#795663',
        ground: '#D2B074',
        dragon: '#DA627D',
        steel: '#1D8A99',
        fighting: '#2F2F2F',
        default: '#2A1A1F',
    };

    const typeNamesInSpanish = {
        electric: 'Eléctrico',
        normal: 'Normal',
        fire: 'Fuego',
        water: 'Agua',
        ice: 'Hielo',
        rock: 'Roca',
        flying: 'Volador',
        grass: 'Planta',
        psychic: 'Psíquico',
        ghost: 'Fantasma',
        bug: 'Bicho',
        poison: 'Veneno',
        ground: 'Tierra',
        dragon: 'Dragón',
        steel: 'Acero',
        fighting: 'Lucha',
        default: 'Desconocido',
    };

    const statNamesInSpanish = {
        height: 'Altura',
        weight: 'Peso',
        hp: 'PS',
        attack: 'Ataque',
        defense: 'Defensa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        speed: 'Velocidad',
    };

    const excludedStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

    const searchPokemon = async () => {
        const pokemonInput = document.querySelector('#pokemonInput');
        const value = pokemonInput.value.trim().toLowerCase();

        // Validación de entrada
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            alert("Por favor, ingresa solo letras y números");
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
            if (!response.ok) throw new Error('No encontrado');
            const data = await response.json();
            renderPokemonData(data);
        } catch (error) {
            renderNotFound();
        }
    };

    const renderPokemonData = (data) => {
        const { stats, types, height, weight } = data;

        pokeName.textContent = data.name;
        pokeImg.setAttribute('src', data.sprites.front_default);
        pokeId.textContent = `Nº ${data.id}`;
        pokeHeight.textContent = `Altura: ${height / 10} m`;
        pokeWeight.textContent = `Peso: ${weight / 10} kg`;
        setCardColor(types);
        renderPokemonTypes(types);
        renderPokemonStats(stats);
    };

    const setCardColor = (types) => {
        const colorOne = typeColors[types[0].type.name];
        const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
        pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
        pokeImg.style.backgroundSize = '5px 5px';
    };

    const renderPokemonTypes = (types) => {
        pokeTypes.innerHTML = '';
        types.forEach(type => {
            const typeTextElement = document.createElement("div");
            typeTextElement.style.color = typeColors[type.type.name];
            typeTextElement.textContent = typeNamesInSpanish[type.type.name] || type.type.name;
            pokeTypes.appendChild(typeTextElement);
        });
    };

    const renderPokemonStats = (stats) => {
        pokeStats.innerHTML = '';
        stats.forEach(stat => {
            // Solo añade las estadísticas que no están en el arreglo de exclusión
            if (!excludedStats.includes(stat.stat.name)) {
                const statElement = document.createElement("div");
                const statElementName = document.createElement("div");
                const statElementAmount = document.createElement("div");

                // Usa el nombre en español de la estadística
                statElementName.textContent = statNamesInSpanish[stat.stat.name] || stat.stat.name;
                statElementAmount.textContent = stat.base_stat;

                statElement.appendChild(statElementName);
                statElement.appendChild(statElementAmount);
                pokeStats.appendChild(statElement);
            }
        });
    };

    const renderNotFound = () => {
        pokeName.textContent = 'No encontrado';
        pokeImg.setAttribute('src', 'poke-shadow.png');
        pokeImg.style.background = '#fff';
        pokeTypes.innerHTML = '';
        pokeStats.innerHTML = '';
        pokeId.textContent = '';
    };

    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', searchPokemon);

    // Prevent form submission and handle Enter key
    document.querySelector('#pokemonInput').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            alert("Por favor, presiona el botón de búsqueda");
        }
    });
});
