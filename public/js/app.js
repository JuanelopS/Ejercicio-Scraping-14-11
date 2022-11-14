const divProducts = document.querySelector('.products');

const URL = 'http://localhost:4000/scraper';

  /* Mediante fetch se recoge la promesa -> información enviada por index.js (backend),
  mediante un bucle map se recorre dicho JSON y con insertAdjacentHTML se va 'pintando'
  en el html (concretamente en la clase .products)  */


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