const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const url = 'https://www.imdb.com/title/tt0118715/';

app.get('/scrape', (req, res) => {
  let json = { title : "", release : "", rating : ""};

  request(url, (error, response, html) => {
    if(!error){
      const $ = cheerio.load(html)
      json.title = $('div > h1', html).text()
      json.release = $('a[title*="See more release dates"]', html).text()
      json.rating = $('span[itemProp*="ratingValue"]', html).text()
    }

    fs.writeFile('movies/output.json', JSON.stringify(json, null, 4), (err) => {
        console.log(`File '${json.title}' successfully written! - Check your project directory for the output.json file`);
    })

    res.send('Check your console!')

  });
})

app.listen('8000')
console.log('Magic happens on port 8000');
exports = module.exports = app;
