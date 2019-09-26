const requestPromise = require('request-promise');
const $ = require('cheerio');
const otocsv = require('objects-to-csv');
const url = 'https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States';

const info = url => {
  return requestPromise(url)
    .then(html => {
      return {
        name: $('.firstHeading', html).text(),
        birthday: $('.bday', html).text(),
      };
    })
    .catch(error => {
      console.log(error)
    });
};

getPresidentInfo = () => {
  requestPromise(url)
  .then(html => {
    const wikiUrls = [];
    for (let i = 0; i < 45; i++) {
      wikiUrls.push($('big > a', html)[i].attribs.href);
    }
    return Promise.all(
      wikiUrls.map(url => {
        return info('https://en.wikipedia.org' + url);
      })
    );
  })
  .then(data => {
    console.log(data);
    const transformed = new otocsv(data);
    return transformed.toDisk('./output.csv');
  })
  .catch(error => {
    console.log(error)
  });
}
