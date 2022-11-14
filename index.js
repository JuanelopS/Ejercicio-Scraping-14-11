const express = require('express');
const cheerio = require('cheerio');
const { join } = require('path');
const axios = require('axios');

const app = express();
const PORT = 4000;
const URL = "https://webscraper.io/test-sites/e-commerce/allinone/computers";

app.use(express.static(join(__dirname, 'public')));

app.get('/scraper', (req, res) => {

    /* mediante axios (fetch) y cheerio se recorre el html, y con el método each se 
    se busca en el interior de la/s clase/s .thumbnail -> name / price / description,
    y lo voy almacenando en un array haciendo uso de un spread operator [...] el cual se
    exporta como json */

    axios(URL)
        .then(response => {
            //console.log(response.data);
            const html = response.data;

            const $ = cheerio.load(html)

            let products = [];
            $('.thumbnail', html).each(function () {
                const name = $(this).find('a').text();   
                const price = $(this).find('h4.price').text();
                const description = $(this).find('p.description').text();
               products = [...products, { name, price, description }];  // equivale al método push
            })
            res.json(products);
        })
        .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))