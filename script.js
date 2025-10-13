
const pokemonInput = document.getElementById('pokemonInput');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');

const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';


async function findPokemon() {
    const pokemonName = pokemonInput.value.trim().toLowerCase();
    if (!pokemonName) {
        alert('กรุณาใส่ชื่อโปเกมอน!');
        return;
    }

    resultDiv.innerHTML = '<p>กำลังโหลด...</p>';

    try {
        
        const response = await fetch(apiBaseUrl + pokemonName);

        if (!response.ok) {
            throw new Error('ไม่พบโปเกมอนตัวนี้!');
        }

        
        const data = await response.json();

        
        displayPokemon(data);

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        console.error('Error fetching data:', error);
    }
}


function displayPokemon(data) {
    
    const name = data.name;
    const imageUrl = data.sprites.front_default; // URL รูปภาพ
    const id = data.id;
    const height = data.height / 10; 
    const weight = data.weight / 10; 
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); 

    const htmlContent = `
        <h2>${name}</h2>
        <img src="${imageUrl}" alt="Image of ${name}">
        <p><strong>No.:</strong> ${id}</p>
        <p><strong>Type:</strong> ${types}</p>
        <p><strong>Height:</strong> ${height} m</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
    `;

    resultDiv.innerHTML = htmlContent;
}


searchButton.addEventListener('click', findPokemon);
pokemonInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        findPokemon();
    }
});