const divProducts = document.querySelector('.products');

const URL = 'http://localhost:4000/scraper';

fetch(URL)
    .then(response => response.json())
    .then(data => data.map(({ name, price, description }) => {
      divProducts.insertAdjacentHTML('beforeend', 
      `
        <div class='product'>
          <h3>${name}</h3>
          <p style = 'color: blue'>${price}</p>
          <p style = 'color: black'>${description}</p>
        </div>
      `);
    }))
    .catch(error => console.log(error));