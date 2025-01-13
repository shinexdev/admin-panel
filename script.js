document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('json-input');
    const loadJsonButton = document.getElementById('load-json');
    const cardList = document.getElementById('card-list');
    const editForm = document.getElementById('edit-form');
    const deleteButton = document.getElementById('delete-card');
    let cardsData = [];
    let selectedCardId = null;
  
    // Load JSON data and display cards
    loadJsonButton.addEventListener('click', () => {
      try {
        const data = JSON.parse(jsonInput.value);
        cardsData = data;
        renderCards();
      } catch (error) {
        alert('Invalid JSON data');
      }
    });
  
    // Render cards
    function renderCards() {
      cardList.innerHTML = '';
      cardsData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
          <h3>${card.league}</h3>
          <p>${card.home_name} vs ${card.away_name}</p>
          <p>${card.date} | ${card.time}</p>
        `;
        cardElement.addEventListener('click', () => populateEditForm(card));
        cardList.appendChild(cardElement);
      });
    }
  
    // Populate edit form with card data
    function populateEditForm(card) {
      selectedCardId = card.id;
      document.getElementById('league').value = card.league;
      document.getElementById('time').value = card.time;
      document.getElementById('date').value = card.date;
      document.getElementById('home-name').value = card.home_name;
      document.getElementById('home-img').value = card.home_img;
      document.getElementById('away-name').value = card.away_name;
      document.getElementById('away-img').value = card.away_img;
  
      const linksInputs = document.getElementById('links-inputs');
      linksInputs.innerHTML = '';
      Object.entries(card.links).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.placeholder = key;
        linksInputs.appendChild(input);
      });
    }
  
    // Update card data
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (selectedCardId === null) return;
  
      const cardIndex = cardsData.findIndex(card => card.id === selectedCardId);
      if (cardIndex === -1) return;
  
      cardsData[cardIndex] = {
        ...cardsData[cardIndex],
        league: document.getElementById('league').value,
        time: document.getElementById('time').value,
        date: document.getElementById('date').value,
        home_name: document.getElementById('home-name').value,
        home_img: document.getElementById('home-img').value,
        away_name: document.getElementById('away-name').value,
        away_img: document.getElementById('away-img').value,
        links: Object.fromEntries(
          Array.from(document.querySelectorAll('#links-inputs input')).map(input => [input.placeholder, input.value])
        ),
      };
  
      renderCards();
    });
  
    // Delete card
    deleteButton.addEventListener('click', () => {
      if (selectedCardId === null) return;
  
      cardsData = cardsData.filter(card => card.id !== selectedCardId);
      selectedCardId = null;
      editForm.reset();
      renderCards();
    });
  });