const express = require('express');
const cheerio = require('cheerio');
const { join } = require('path');
const axios = require('axios');

const app = express();
const PORT = 4000;
const URL = "https://webscraper.io/test-sites/e-commerce/allinone/computers";

app.use(express.static(join(__dirname, 'public')));

app.get('/scraper', (req, res) => {

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
               products = [...products, { name, price, description }];
            })
            res.json(products);
        })
        .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))