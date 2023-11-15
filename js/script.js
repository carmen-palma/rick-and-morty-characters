const characterList = document.getElementById('character-list');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
let currentPage = 1;

//obtener los datos 
function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      showCharacters(data.results);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

//personajes en la página
function showCharacters(characters) {
  characterList.innerHTML = ''; 

  characters.forEach(character => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.species}</p>
    `;
    characterList.appendChild(listItem);
  });
}

//botones
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);
});

fetchCharacters(currentPage);
